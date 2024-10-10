"use client";
import { FC, ReactElement } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "@/components";

export const HomeModule: FC = (): ReactElement => {
  return (
    <section className="container w-full min-h-screen py-8 px-6 flex flex-col gap-y-4 justify-center items-center">
      <div className="text-center z-10">
        <h1 className="text-5xl lg:text-8xl font-bold text-gray-700 ">
          Quiztify{" "}
          <span className="bg-gradient-to-t from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            Trivia
          </span>
        </h1>
      </div>
      <h2 className="text-2xl text-center font-medium">
        Get ready to test your knowledge
      </h2>
      <div className="flex gap-x-4 items-center ">
        <Button onClick={() => signIn()}>Login to start quiz</Button>
        <Link
          href="/auth/register"
          className={buttonVariants({ variant: "outline" })}
        >
          Register
        </Link>
      </div>
    </section>
  );
};
