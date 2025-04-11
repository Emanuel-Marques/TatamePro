
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HeaderMenu } from "./HeaderMenu";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-custom-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="container py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-custom-text">TatamePro</h1>
            <HeaderMenu />
          </div>
        </div>
        <div className="container py-6 space-y-6">
          {children}
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}
