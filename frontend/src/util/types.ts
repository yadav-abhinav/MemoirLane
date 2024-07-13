import { SvgIconComponent } from "@mui/icons-material";
import { PaletteMode } from "@mui/material";
import React from "react";

export type AuthContextType = {
  user: JWTPayload;
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type themeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export type Feature = {
  title: string;
  description: string;
  Icon: SvgIconComponent;
};

export type ErrorResponse = {
  success: boolean;
  error: string;
  timeStamp: Date;
};

export type JWTPayload = {
  userId: string;
  email: string;
};

export type MediaInfo = {
  id: string;
  src: string;
  fileName: string;
  caption?: string;
  uploadedAt: Date;
  rows?: number;
  cols?: number;
};

export type MediaTimelineMap = {
  [month: string]: { [day: string]: MediaInfo[] };
};

export interface SuccessResponse<T> {
  success: boolean;
  payload: T;
  timeStamp: Date;
}

