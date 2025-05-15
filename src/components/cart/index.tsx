import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { CartItem } from "./cart-item";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Tu Carrito</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              handleQuantityChange={handleQuantityChange}
              removeFromCart={removeFromCart}
            />
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={goToCheckout}
              className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
