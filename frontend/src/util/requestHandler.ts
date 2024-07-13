import axios, { HttpStatusCode, isAxiosError } from "axios";
import ApiError from "./apiError";
import { ErrorResponse, SuccessResponse } from "./types";
import { toast } from "react-toastify";

class RequestSender {
  host: string;

  constructor() {
    this.host = import.meta.env["VITE_BACKEND_ENDPOINT"];
  }

  get<T>(route: string, headers = {}) {
    return this.sendRequest<T>(route, "GET", {}, headers);
  }

  post<T>(route: string, body = {}, headers = {}) {
    return this.sendRequest<T>(route, "POST", body, headers);
  }

  put<T>(route: string, body = {}, headers = {}) {
    return this.sendRequest<T>(route, "PUT", body, headers);
  }

  patch<T>(route: string, body = {}, headers = {}) {
    return this.sendRequest<T>(route, "PATCH", body, headers);
  }

  delete<T>(route: string, headers = {}) {
    return this.sendRequest<T>(route, "DELETE", headers);
  }

  private async sendRequest<T>(
    route: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body = {},
    headers = {}
  ): Promise<T> {
    const endpoint = this.host + `/${route}`;
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const { data } = await axios<SuccessResponse<T>>(endpoint, {
        method: method,
        data: body,
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
      if (!data.success) throw new ApiError();
      return data.payload;
    } catch (err) {
      let msg = "Internal Server Error";
      if (
        isAxiosError<ErrorResponse>(err) &&
        err.response?.status == HttpStatusCode.Unauthorized
      ) {
        await this.refreshAccessToken();
        return await this.sendRequest<T>(route, method, body, headers);
      } else if (isAxiosError<ErrorResponse>(err))
        msg = err.response?.data.error ?? msg;
      throw new ApiError(msg);
    }
  }

  private async refreshAccessToken() {
    const refreshEndpoint = this.host + "/refresh";
    try {
      const {
        data: {
          success,
          payload: { accessToken },
        },
      } = await axios.get<SuccessResponse<{ accessToken: string }>>(
        refreshEndpoint
      );
      sessionStorage.setItem("token", accessToken);
      if (!success) throw new Error();
    } catch (err) {
      toast.dismiss();
      setTimeout(() => {
        window.location.href = "/logout";
      }, 5000);
      toast.error("Session Expired");
      throw new ApiError("Session Expired");
    }
  }
}

export default new RequestSender();
