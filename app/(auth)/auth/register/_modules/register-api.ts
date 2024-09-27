import { TRegisterRequest, TRegisterResponse } from "@/entities";
import { api } from "@/services";

export const PostRegister = async (props: TRegisterRequest): Promise<TRegisterResponse> => {
    console.log("Request Data:", props);
    const { data } = await api<TRegisterResponse>({
      url: '/register',
      method: 'POST',
      data: props,
    });
    console.log("Response Data:", data);
    return data;
  };