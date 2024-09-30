import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TMetaErrorResponse } from "@/entities";
import { getTriviaQuestions, getTriviaToken } from "./trivia-api";
import { IQuestion } from "./interface";

export const useTriviaToken = (): UseQueryResult<
  string,
  TMetaErrorResponse
> => {
  return useQuery<string, TMetaErrorResponse>({
    queryKey: ["triviaToken"],
    queryFn: getTriviaToken,
    retry: 1,
  });
};

export const useTriviaQuestions = (
  token: string
): UseQueryResult<{ results: IQuestion[] }, TMetaErrorResponse> => {
  return useQuery<{ results: IQuestion[] }, TMetaErrorResponse>({
    queryKey: ["triviaQuestions", token],
    queryFn: () => getTriviaQuestions(token),
    enabled: !!token,
    retry: 1,
  });
};
