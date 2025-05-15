import React from "react";
import { Cart } from "../components/cart";
import { UserLayout } from "../layouts/user-layout";

export const CartPage: React.FC = () => {
  return (
    <UserLayout>
      <Cart />
    </UserLayout>
  );
};
