"use client";
import React, { FC, ReactElement, useState } from "react";
import { signIn } from "next-auth/react";
import { Button, ControlledFieldText, ToastWrapper } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginRequest, VSLogin } from "@/entities";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginModule: FC = (): ReactElement => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginRequest>({
    resolver: zodResolver(VSLogin),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
      }

      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/playground");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  });
  return (
    <>
      <ToastWrapper />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <p className="bg-red-100 border border-red-400 text-center p-2 text-red-400 mx-auto rounded-md">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <ControlledFieldText
            control={control}
            label="Email"
            size="md"
            name="email"
            type="email"
            placeholder="example: email@example.com"
            status={errors.email ? "error" : "default"}
            message={errors.email?.message}
            required
          />
          <ControlledFieldText
            control={control}
            label="Password"
            size="md"
            name="password"
            type="password"
            placeholder="********"
            status={errors.password ? "error" : "default"}
            message={errors.password?.message}
            required
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember_me"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full"
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
          <div className="flex items-center text-sm text-indigo-600 gap-x-1">
            <span> Do not have account ? </span>
            <Link href="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
