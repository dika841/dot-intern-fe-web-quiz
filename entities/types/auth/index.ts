import { TMetaResponse } from "@/entities";
import { TUser } from "../user";

export type TLoginRequest = {
    email: string;
    password: string;
}

export type TRegisterRequest = {
    email: string;
    password: string;
    name: string;
};

export type TToken = {
    expired: number;
    accessToken: string;
    refreshToken: string;
  };
export type TLoginResponse = {
    id: string;
    user: TUser;
    token: TToken;
  };
  export type TUserRequest = {
    id?: string;
    name: string | null;
    email?: string;
    avatar?: string;
    password?: string;

  };
  export type TRegisterResponse = {
    message: string;
  };
  export type TUserResponse = TMetaResponse<TUserRequest[]>;