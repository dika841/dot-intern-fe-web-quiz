import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider, SessionWrapper } from "@/libs";
import { FC, ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiztify",
  description: "Test your knowledge",
};
type TChildrenProps = {
  children: JSX.Element;
};
const RootLayout: FC<TChildrenProps> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <QueryProvider>{children}</QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
};
export default RootLayout;
