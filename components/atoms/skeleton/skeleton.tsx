import { cn } from "@/utilities";
import { FC, ReactElement } from "react";

export const Skeleton: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}): ReactElement => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-600/10", className)}
      {...props}
    />
  );
};
