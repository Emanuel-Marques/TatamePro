import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Athletes from "./pages/Athletes";
import Finance from "./pages/Finance";
import Classes from "./pages/Classes";
import Modalities from "./pages/Modalities";
import Instructors from "./pages/Instructors";
import Plans from "./pages/Plans";
import Registration from "./pages/Registration";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import AthleteProfile from "./pages/AthleteProfile";
import Settings from "./pages/Settings";
import Loader from "./components/auth/Loader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Loader />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/atletas" element={<Athletes />} />
            <Route path="/atletas/:id" element={<AthleteProfile />} />
            <Route path="/financeiro" element={<Finance />} />
            <Route path="/aulas" element={<Classes />} />
            <Route path="/modalidades" element={<Modalities />} />
            <Route path="/instrutores" element={<Instructors />} />
            <Route path="/planos" element={<Plans />} />
            <Route path="/matricula" element={<Registration />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/definicoes" element={<Settings />} />
            <Route path="/perfil" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
