"use client";
import { NextPage } from "next";
import { ReactElement } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button, buttonVariants } from "@/components";

const Landing: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen py-8 px-6 flex flex-col gap-y-4 justify-center items-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold ">
          Quiz <span className="text-blue-500">Trivia</span>
        </h1>
      </div>
      <h2>Get ready to test your knowledge</h2>
      <div className="flex gap-x-4 items-center ">
        <Button onClick={() => signIn()}>Login</Button>
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

export default Landing;
