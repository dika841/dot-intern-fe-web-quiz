"use client";
import { useGetLocalStorage } from "@/utilities/local-storage-hooks";
import { FC, ReactElement } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { QuizState } from "@/entities/common";

export const QuizResult: FC = (): ReactElement => {
  const [storedValue] = useGetLocalStorage<QuizState>("quizState");
  const router = useRouter();
  const handleTryAgain = (): void => {
    window.localStorage.removeItem("quizState");
    router.push("/playground");
  };
  return (
    <section className="flex flex-col w-full h-full mt-8 items-center justify-center">
      <h1 className="text-2xl md:text-5xl text-gray-700 font-bold">
        Your Test Result
      </h1>
      <div className="flex md:flex-row flex-col md:gap-x-4 gap-y-4 mt-8">
        <div className="bg-indigo-500 size-40 text-white rounded-lg shadow-md p-2 space-y-4 ">
          <h2 className="text-center font-medium">Correct Answer</h2>
          <Icon
            icon="mdi:check"
            className="size-8 bg-green-500 rounded-md shadow-md mx-auto"
          />
          <h2 className="text-center text-4xl font-bold">
            {storedValue.correctAnswersCount}
          </h2>
        </div>
        <div className="bg-indigo-500 size-40 text-white rounded-lg shadow-md p-2 space-y-4">
          <h2 className="text-center font-medium">Incorect Answer</h2>
          <Icon
            icon="mdi:close"
            className="size-8 bg-red-500 rounded-md shadow-md mx-auto"
          />
          <h2 className="text-center text-4xl font-bold">
            {storedValue.incorrectAnswersCount}
          </h2>
        </div>
        <div className="bg-indigo-500 size-40 text-white rounded-lg shadow-md p-2 space-y-4">
          <h2 className="text-center font-medium">Questions Answered</h2>
          <Icon
            icon="mdi:question-mark"
            className="size-8 bg-fuchsia-500 rounded-md shadow-md mx-auto"
          />
          <h2 className="text-center text-4xl font-bold">
            {storedValue.totalQuestionsAnswered}
          </h2>
        </div>
      </div>
      <Button onClick={handleTryAgain} className="mt-8">
        Try Again
      </Button>
    </section>
  );
};
