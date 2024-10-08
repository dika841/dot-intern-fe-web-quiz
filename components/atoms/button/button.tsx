import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utilities/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-800 text-white shadow hover:bg-indigo-800/90",
        destructive: "bg-red-600 text-red-100 shadow-sm hover:bg-red-600/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-white hover:text-gray-700",
        secondary: "bg-blue-600 text-white shadow-sm hover:bg-blue-600/80",
        ghost: "hover:bg-transparent hover:text-inherit",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icon
            icon="eos-icons:loading"
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
