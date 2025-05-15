import React from "react";
import { UserLayout } from "../layouts/user-layout";
import { ProductList } from "../components/products/product-list";

export const UserHome: React.FC = () => {
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido a la tienda deportiva
      </h1>
      <p>Aquí podrás explorar nuestros productos.</p>
      <ProductList />
    </UserLayout>
  );
};
