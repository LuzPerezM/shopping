import React from "react";
import { Checkout } from "../components/checkout";
import { UserLayout } from "../layouts/user-layout";

export const CheckoutPage: React.FC = () => {
  return (
    <UserLayout>
      <Checkout />
    </UserLayout>
  );
};
