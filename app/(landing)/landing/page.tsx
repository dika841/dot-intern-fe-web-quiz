'use client';
import { NextPage } from "next";
import { ReactElement } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

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
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg  hover:bg-blue-300 font-semibold"
        >
          Login
        </button>
        <Link
          href="/auth/register"
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 font-semibold"
        >
          Register
        </Link>
      </div>
    </section>
  );
};

export default Landing;
