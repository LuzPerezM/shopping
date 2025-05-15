import React from "react";
import { useAuth } from "../context/auth-provider";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart-context";

export const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemsQuantity =
    cart.length > 0
      ? cart.reduce((total, item) => total + item.quantity, 0)
      : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/user-home")}
        >
          🏀 SportShopping
        </div>
        <ul className="flex gap-6 text-gray-700">
          <li>
            <button
              onClick={() => navigate("/user-home")}
              className="hover:text-blue-600"
            >
              Catálogo
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/cart")}
              className="hover:text-blue-600"
            >
              <div className="flex items-center gap-2">
                Carrito
                <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <p className="text-xs">{itemsQuantity}</p>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/orders")}
              className="hover:text-blue-600"
            >
              Ordenes
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile")}
              className="hover:text-blue-600"
            >
              Perfil
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
