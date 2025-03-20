import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-dark text-light min-h-screen">
      <header className="p-4 border-b border-gray text-center">
        <h1 className="text-2xl font-bold">My Genz</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
