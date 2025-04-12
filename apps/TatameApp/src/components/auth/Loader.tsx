import api from "@/api";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Loader() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) return setIsAuthenticated(false);
  
        try {
          const response = await api.verifyToken();
          if (response?.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error("Error verifying token:", err);
          setIsAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="w-24 h-24 border-8 border-[#2E3D52] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    if (isAuthenticated === false) return <Navigate to="/login" replace />;
  return <Outlet />;
}
