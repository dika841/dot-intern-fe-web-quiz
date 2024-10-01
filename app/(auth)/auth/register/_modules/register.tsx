"use client";
import { Button, ControlledFieldText, ToastWrapper } from "@/components";
import { TRegisterRequest, VSRegister } from "@/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hook";
import { toast } from "react-toastify";
import Link from "next/link";

export const RegisterModule: FC = (): ReactElement => {
  const [error, setError] = useState<string | undefined>(undefined);
  const { mutate, isPending } = useRegister();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TRegisterRequest>({
    resolver: zodResolver(VSRegister),
    mode: "all",
  });
  const onSubmit = handleSubmit(async (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Register Successful!");

        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      },
      onError: (error) => {
        console.error("Error:", error);
        setError("Failed to register.");
      },
    });
  });

  return (
    <section className="flex w-full min-h-screen items-center justify-center bg-gray-100">
      <ToastWrapper />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <ControlledFieldText
            name="name"
            control={control}
            label="Fullname"
            size="md"
            type="text"
            status={errors?.name ? "error" : "default"}
            message={errors?.name?.message}
            placeholder="example: John Doe"
            required
          />
          <ControlledFieldText
            name="email"
            control={control}
            label="Email"
            size="md"
            type="email"
            status={errors?.email ? "error" : "default"}
            message={errors?.email?.message}
            placeholder="example: email@example.com"
            required
          />
          <ControlledFieldText
            name="password"
            control={control}
            label="Password"
            size="md"
            type="password"
            status={errors?.password ? "error" : "default"}
            message={errors?.password?.message}
            placeholder="********"
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isPending}
            isLoading={isPending}
          >
            Register
          </Button>
          <div className="flex items-center text-sm text-indigo-600 gap-x-1">
            <span> Already have account ? </span>
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
