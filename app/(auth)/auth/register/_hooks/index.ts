import {
  TMetaErrorResponse,
  TRegisterRequest,
  TRegisterResponse,
} from "@/entities";
import { PostRegister } from "@/services/auth/register-api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

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
