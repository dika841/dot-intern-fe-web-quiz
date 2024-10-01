import { FC, ReactNode } from "react";
import { Header } from "./_modules/header";
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Quiztify  | Playground",
  description: "Your Playground",
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className="container min-h-screen flex flex-col">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
