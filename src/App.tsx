import React from "react";
import { AuthProvider } from "./context/auth-provider";
import { AuthGate } from "./views/auth-gate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserHome } from "./views/user-home";
import { LoginForm } from "./components/login/login-form";
import { SignUp } from "./views/sign-up";
import { Profile } from "./views/profile";
import { CartPage } from "./views/cart";
import { CartProvider } from "./context/cart-context";
import { CheckoutPage } from "./views/checkout";
import { OrdersPage } from "./views/orders";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthGate />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
