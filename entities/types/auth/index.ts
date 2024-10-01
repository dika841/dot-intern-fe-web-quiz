import { TUser } from "../user";

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TLoginResponse = {
  id: string;
  user: TUser;
};

export type TRegisterResponse = {
  message: string;
};
