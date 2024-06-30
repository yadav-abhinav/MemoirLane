import { SvgIconComponent } from "@mui/icons-material";
import { PaletteMode } from "@mui/material";
import React from "react";

export type authContextType = {
  user: CustomJWTPayload;
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type themeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export type feature = {
  title: string;
  description: string;
  Icon: SvgIconComponent;
};

export type errorResponse = {
  success: boolean;
  error: string;
  timeStamp: Date;
};

export interface successResponse {
  success: boolean;
  payload: object;
  timeStamp: Date;
}

export interface loginResponse extends successResponse {
  payload: { accessToken: string };
}

export interface CustomJWTPayload {
  userId: string;
  email: string;
}
