import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Bienvenido a la tienda deportiva</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};
