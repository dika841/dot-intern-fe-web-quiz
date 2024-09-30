import axios from "axios";
import { IQuestion } from "./interface";

const BaseURL = "https://opentdb.com/api.php";
const TokenUrl = "https://opentdb.com/api_token.php";

export const getTriviaQuestions = async (
  token: string
): Promise<{ results: IQuestion[] }> => {
  const { data } = await axios.get(
    `${BaseURL}?amount=10&type=multiple&token=${token}`
  );
  return data;
};

export const getTriviaToken = async () => {
  const response = await axios.post(`${TokenUrl}?command=request`);
  if (response.data.response_code !== 0) {
    throw new Error("Failed to fetch token");
  }
  return response.data.token;
};
