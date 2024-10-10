import { Metadata } from "next";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "Quiztify  | Login & Register",
  description: "Login and Register",
};
const Layout: FC<LayoutProps> = ({ children }) => (
  <main className="container min-h-screen flex items-center justify-center bg-gray-100">
    {children}
  </main>
);
export default Layout;
