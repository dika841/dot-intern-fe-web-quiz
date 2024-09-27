import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
const configApi: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};
export const api = axios.create(configApi);

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     console.log("Session", session);
//     const token = session?.user?.token?.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
