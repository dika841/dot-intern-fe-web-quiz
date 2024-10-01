import { TRegisterRequest, TRegisterResponse } from "@/entities";
import axios from "axios";

export const PostRegister = async (
  props: TRegisterRequest
): Promise<TRegisterResponse> => {
  const { data } = await axios<TRegisterResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    method: "POST",
    data: props,
  });

  return data;
};
