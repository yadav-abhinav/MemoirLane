import { IMedia } from "./media.entity";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  images: IMedia[];
}

export interface IUserSession {
  refreshToken: string;
  userId: string;
  createdAt: Date;
}
