import { TLoginRequest, TLoginResponse } from "@/entities";
import { api } from "@/services";

export const PostLogin = async (props :TLoginRequest ):Promise<TLoginResponse> => {
    const {data} = await api<TLoginResponse>({
        url: '/login',
        method: 'POST',
        data: props
    });
    return data;
}