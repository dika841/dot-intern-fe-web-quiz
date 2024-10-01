"use client";
import {
  useTriviaQuestions,
  useTriviaToken,
} from "@/services/opentb/trivia-hooks";
import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { Button, Skeleton } from "@/components";
import { IQuestion } from "@/services/opentb/interface";
import { Icon } from "@iconify/react";
import { cn, useGetLocalStorage } from "@/utilities";

export interface QuizState {
  token: string | null;
  questions: IQuestion[];
  currentQuestionIndex: number;
  correctAnswersCount: number;
  totalQuestionsAnswered: number;
  timeLeft: number;
}

export const PlaygroundModule: FC = (): ReactElement => {
  const router = useRouter();

  const {
    data: triviaToken,
    isLoading: isTokenLoading,
    isError: isTokenError,
    error: tokenError,
  } = useTriviaToken();

  const {
    data: triviaData,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
    error: questionsError,
  } = useTriviaQuestions(triviaToken || "");
  const [storedValue] = useGetLocalStorage<QuizState>("quizState");

  const [quizState, setQuizState] = useState<QuizState>({
    token: null,
    questions: [],
    currentQuestionIndex: 0,
    correctAnswersCount: 0,
    totalQuestionsAnswered: 0,
    timeLeft: 600,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (storedValue?.token !== null && storedValue?.questions?.length > 0) {
      try {
        setQuizState(storedValue);
      } catch (error) {
        console.warn("Failed to parse quizState from localStorage:", error);
      }
    }
  }, [storedValue]);

  useEffect(() => {
    if (
      triviaToken &&
      triviaData &&
      triviaData.results &&
      quizState.questions.length === 0
    ) {
      const formattedQuestions = triviaData?.results?.map(formatQuestion);
      setQuizState((prev) => ({
        ...prev,
        token: triviaToken,
        questions: formattedQuestions,
      }));
    }
  }, [triviaToken, triviaData]);

  useEffect(() => {
    window.localStorage.setItem("quizState", JSON.stringify(quizState));
  }, [quizState]);

  useEffect(() => {
    if (quizState.timeLeft > 0) {
      const timerId = setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (quizState.timeLeft === 0) {
      handleQuizCompletion();
    }
  }, [quizState.timeLeft]);

  function decodeHtml(html: string): string {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function formatQuestion(question: IQuestion): IQuestion {
    const correctAnswer = decodeHtml(question.correct_answer);
    const incorrectAnswers = question.incorrect_answers.map(decodeHtml);
    return {
      ...question,
      question: decodeHtml(question.question),
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      random_answers: shuffle([correctAnswer, ...incorrectAnswers]),
    };
  }

  const handleNextQuestion = (answer: string): void => {
    if (selectedAnswer) return;

    const currentQ = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQ.correct_answer;

    setQuizState((prev) => ({
      ...prev,
      correctAnswersCount: isCorrect
        ? prev.correctAnswersCount + 1
        : prev.correctAnswersCount,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
    }));

    setSelectedAnswer(answer);

    setTimeout(() => {
      setSelectedAnswer(null);
      const nextQuestion = quizState.currentQuestionIndex + 1;
      if (nextQuestion < quizState.questions.length) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestionIndex: nextQuestion,
        }));
      } else {
        handleQuizCompletion();
      }
    }, 500);
  };

  const handleQuizCompletion = () => {
    localStorage.removeItem("quizState");
    router.push("/result");
  };

  const formatTime = (): string => {
    const minutes = Math.floor(quizState.timeLeft / 60);
    const seconds = quizState.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentQuestion = quizState?.questions[quizState?.currentQuestionIndex];
  if (isTokenLoading || isQuestionsLoading) {
    return (
      <section className="container h-full w-full mx-auto p-6 max-w-3xl">
        <Skeleton className="w-full h-12" />
        <div className="mb-4 mt-6">
          <div className="flex justify-between mb-2">
            <Skeleton className="w-1/5 h-5" />
            <Skeleton className="w-1/6 h-5" />
          </div>
          <div>
            <Skeleton className="w-full h-2.5" />
          </div>
        </div>
        <div className="flex flex-col gap-y-6 p-6">
          <Skeleton className="w-full h-24" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
          </div>
        </div>
      </section>
    );
  }

  if (isTokenError || isQuestionsError) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-xl">
            {tokenError?.message ||
              questionsError?.message ||
              "Error fetching data"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </main>
    );
  }

  return (
    <section className="container mx-auto p-6 max-w-3xl">
      <div className="bg-indigo-500 p-4 rounded-lg text-white mx-auto text-center shadow-lg my-6 flex items-center justify-center">
        <Icon icon="mdi:alarm" width={24} className="mr-2" />
        <p className="text-xl font-semibold">
          Time Remaining:
          <span className="ml-2 font-bold text-2xl">{formatTime()}</span>
        </p>
      </div>
      <div className="mb-6 px-2">
        <div className="flex justify-between mb-2">
          <span>
            Question {quizState.currentQuestionIndex + 1} of{" "}
            {quizState.questions.length}
          </span>
          <span>Correct Answers: {quizState.correctAnswersCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{
              width: `${
                ((quizState.currentQuestionIndex + 1) /
                  quizState.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 bg-white p-6 rounded-lg shadow-xl">
        {currentQuestion ? (
          <>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center">
              {currentQuestion.question}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.random_answers.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correct_answer;

                return (
                  <li
                    onClick={() => handleNextQuestion(option)}
                    key={idx}
                    className={cn(
                      "bg-gray-50 border border-gray-300 rounded-lg py-4 px-6 text-gray-700 text-lg hover:bg-indigo-500 hover:text-white transition cursor-pointer flex items-center justify-center",
                      {
                        "bg-green-500 text-white": selectedAnswer && isCorrect,
                        "bg-red-500 text-white": isSelected && !isCorrect,
                        "cursor-default": !selectedAnswer,
                      }
                    )}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold text-gray-800">
              No more questions
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
