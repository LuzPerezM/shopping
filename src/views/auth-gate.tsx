import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-provider";
import { useNavigate } from "react-router-dom";
import { Login } from "./login";
import { SignUp } from "./sign-up";

export const AuthGate: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-home");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <></>;
  }

  return (
    <div className="bg-gray-100 min-h-screen ">
      {view === "login" ? <Login /> : <SignUp />}
      <div className="mt-4 flex justify-center ">
        <button
          onClick={() => setView(view === "login" ? "signup" : "login")}
          className="text-black hover:text-blue-500 underline"
        >
          {view === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};
