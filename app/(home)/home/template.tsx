import { FC, PropsWithChildren } from "react";

const Template: FC<Readonly<PropsWithChildren>> = ({ children }) => {
  return (
    <main className="bg-gray-100 relative">
      <div className="bg-gradient-to-br z-0 from-indigo-500 to-fuchsia-600 size-60 lg:size-96 fixed rounded-full opacity-50 top-24 lg:-top-6 left-2 shadow-sm"></div>
      <div className="bg-gradient-to-br z-0 from-fuchsia-500 to-indigo-500 size-40 lg:size-72 fixed rounded-full opacity-40 top-16 lg:-top-20 right-12 shadow-sm"></div>
      <div className="bg-gradient-to-br z-0 from-fuchsia-500 to-indigo-500  size-40 fixed rounded-full opacity-30 bottom-24 right-12 shadow-sm"></div>
      <div className="bg-gradient-to-br z-0 from-indigo-500 to-fuchsia-500  size-20 fixed rounded-full opacity-20 bottom-24 left-80 shadow-sm"></div>

      {children}
    </main>
  );
};
export default Template;
