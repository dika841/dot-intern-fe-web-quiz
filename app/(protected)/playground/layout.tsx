import { FC, ReactNode } from "react";
import { Header } from "./_modules/header";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Quiztify  | Playground",
  description: "Your Playground",
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
