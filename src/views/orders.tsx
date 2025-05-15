import React from "react";
import { UserLayout } from "../layouts/user-layout";
import { Orders } from "../components/orders";

export const OrdersPage = () => {
  return (
    <UserLayout>
      <Orders />
    </UserLayout>
  );
};
