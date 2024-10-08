import { Skeleton } from "@/components/atoms";
import { FC, ReactElement } from "react";

const Loading: FC = (): ReactElement => {
  return (
    <div className="flex flex-col w-full min-h-screen h-screen items-center mt-4 gap-4">
      <Skeleton className="w-1/2 h-1/6" />
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="size-40" />
        <Skeleton className="size-40" />
        <Skeleton className="size-40" />
      </div>
      <Skeleton className="w-16 h-8" />
    </div>
  );
};
export default Loading;
