import { IQuestion } from "@/services/opentb/interface";

export const decodeHtml = (html: string): string => {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
export const shuffle = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formatQuestion = (question: IQuestion): IQuestion => {
  const correctAnswer = decodeHtml(question.correct_answer);
  const incorrectAnswers = question.incorrect_answers.map(decodeHtml);
  return {
    ...question,
    question: decodeHtml(question.question),
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    random_answers: shuffle([correctAnswer, ...incorrectAnswers]),
  };
};
