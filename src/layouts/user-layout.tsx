import React from "react";
import { NavBar } from "../components/nav-bar";

interface Props {
  children: React.ReactNode;
}

export const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-6">{children}</main>
    </div>
  );
};
