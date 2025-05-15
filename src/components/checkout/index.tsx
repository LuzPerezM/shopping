import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-provider";
import { useCart } from "../../context/cart-context";

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    if (cart.length === 0 || !address.trim()) {
      alert("Debes agregar productos y una dirección válida.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/confirm`,
        {
          address,
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderNumber(response.data.orderId);
      clearCart();
    } catch (error: any) {
      console.error("Error al confirmar el pedido:", error);
      if (error.response?.status === 401) {
        alert("Tu sesión expiró. Vuelve a iniciar sesión.");
        navigate("/login");
      } else {
        alert("Ocurrió un error al procesar el pedido.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderNumber) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">✅ Pedido Confirmado</h1>
        <p className="text-lg">
          Tu número de orden es: <strong>{orderNumber}</strong>
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirmar Pedido</h1>

      <div className="mb-4">
        <label className="block mb-1">Dirección de Envío</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Resumen del Pedido:</h2>
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.productId} className="border p-2 rounded">
              {item.name} x {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right font-bold">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={loading || cart.length === 0}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Procesando..." : "Confirmar Pedido"}
      </button>
    </div>
  );
};
