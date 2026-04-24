import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header onMenuClick={() => setIsOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full">
        <Outlet/>
        </main>
      </div>
    </div>
  );
};
