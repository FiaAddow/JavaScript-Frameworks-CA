import "./app.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./App";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Products from "./routes/Products";
import Product from "./routes/Product";
import Checkout from "./routes/Checkout";
import { CartProvider } from "./contexts/CartContext";
import CheckoutSuccess from "./routes/CheckoutSuccess";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="Checkout-success" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CartProvider>,
);
