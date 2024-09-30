"use client";
import React, { useId, forwardRef } from "react";
import { cn } from "@/utilities";
import { Icon } from "@iconify/react";
import { TInput, className } from "@/entities";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputText = forwardRef<HTMLInputElement, TInput>(
  ({ size = "sm", status = "default", placeholder, type, ...props }, ref) => {
    const id = useId();
    const [shown, setShown] = React.useState(false);

    const isPassword = type === "password";

    return (
      <div
        className={cn(
          "flex items-center justify-between text-gray-600 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className({ size, status })
        )}
      >
        <input
          {...props}
          ref={ref}
          id={id}
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
          type={isPassword && shown ? "text" : type}
          aria-describedby={isPassword ? `${id}-toggle` : undefined}
        />
        {isPassword && (
          <Icon
            icon={shown ? "bi:eye-fill" : "bi:eye-slash-fill"}
            className="h-4 w-4 cursor-pointer focus-within:outline-none"
            onClick={() => setShown(!shown)}
            id={`${id}-toggle`}
            role="button"
            aria-label={shown ? "Hide password" : "Show password"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShown(!shown);
              }
            }}
          />
        )}
      </div>
    );
  }
);
InputText.displayName = "InputText";
