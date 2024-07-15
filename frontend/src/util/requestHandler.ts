import axios, { HttpStatusCode, isAxiosError } from "axios";
import ApiError from "./apiError";
import { ErrorResponse, RequestOptions, SuccessResponse } from "./types";
import { toast } from "react-toastify";

class RequestSender {
  host: string;
  constructor() {
    this.host = import.meta.env["VITE_BACKEND_ENDPOINT"];
  }

  get<T>(route: string, options?: RequestOptions) {
    return this.sendRequest<T>(route, "GET", options);
  }

  post<T>(route: string, data?: object, options?: RequestOptions) {
    return this.sendRequest<T>(route, "POST", { ...options, data });
  }

  put<T>(route: string, options?: RequestOptions) {
    return this.sendRequest<T>(route, "PUT", options);
  }

  patch<T>(route: string, options?: RequestOptions | undefined) {
    return this.sendRequest<T>(route, "PATCH", options);
  }

  delete<T>(route: string, options?: RequestOptions | undefined) {
    return this.sendRequest<T>(route, "DELETE", options);
  }

  private async sendRequest<T>(
    route: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    options?: RequestOptions
  ): Promise<T> {
    const endpoint = this.host + `/${route}`;
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      const { data } = await axios<SuccessResponse<T>>(endpoint, {
        method: method,
        ...options,
        headers: { ...options?.headers, Authorization: `Bearer ${token}` },
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
        return await this.sendRequest<T>(route, method, options);
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
      if (localStorage.getItem("token"))
        localStorage.setItem("token", accessToken);
      else sessionStorage.setItem("token", accessToken);

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
