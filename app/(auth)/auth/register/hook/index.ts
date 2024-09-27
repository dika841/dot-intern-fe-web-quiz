import {
  TMetaErrorResponse,
  TRegisterRequest,
  TRegisterResponse,
} from "@/entities";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PostRegister } from "../_modules/register-api";

export const useRegister = (): UseMutationResult<
  TRegisterResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  unknown
> =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (props) => await PostRegister(props),
  });
