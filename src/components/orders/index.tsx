import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth-provider";
import { OrderItem } from "./order-item";

export type Order = {
  id: number;
  address: string;
  total: number;
  created_at: string;
  status: string;
  items: {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export const Orders: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Error al cargar órdenes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated, token]);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Órdenes</h1>

      {orders.length === 0 ? (
        <p>No tienes órdenes todavía.</p>
      ) : (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      )}
    </div>
  );
};
