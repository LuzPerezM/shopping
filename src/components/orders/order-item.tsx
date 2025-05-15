import React from "react";
import { Order } from ".";
import { StatusBadge } from "../ui/status-badge";

export const OrderItem = ({ order }: { order: Order }) => {
  return (
    <div className="border p-6 mb-6 rounded shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">Orden #{order.id}</h2>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-sm text-gray-600">
        Fecha: {new Date(order.created_at).toUTCString()}
      </p>
      <p className="text-sm">Dirección: {order.address}</p>
      <p className="font-semibold mt-2">
        Total: ${Number(order.total).toFixed(2)}
      </p>

      <h3 className="mt-3 font-semibold">Artículos:</h3>
      <ul className="list-disc pl-5 text-sm">
        {order.items.map((item) => (
          <li key={item.product_id}>
            {item.name} — {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
