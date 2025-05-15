import React from "react";
import { CartItem as ICartItem } from "../../context/types";

interface Props {
  item: ICartItem;
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  handleQuantityChange,
  removeFromCart,
}) => {
  return (
    <div
      key={item.productId}
      className="flex items-center border p-4 rounded shadow-sm"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500">${item.price}</p>
        <div className="mt-2 flex items-center gap-2">
          <label className="text-sm text-gray-600">Cantidad:</label>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.productId, Number(e.target.value))
            }
            className="w-16 p-1 border border-gray-300 rounded"
          />
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.productId)}
        className="text-red-500 hover:underline ml-4"
      >
        Eliminar
      </button>
    </div>
  );
};
