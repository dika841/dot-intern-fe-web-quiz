import { Skeleton } from "@/components/atoms";
import { FC, ReactElement } from "react";

const Loading: FC = (): ReactElement => {
  return (
    <div className="w-full h-screen">
      <Skeleton className="w-full h- md:w-4/5 mx-auto mt-4" />
    </div>
  );
};
export default Loading;
