// Style
import "./style/App.css";
// React Router
import { Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import CreateProduct from "./pages/CreateProduct";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Sellers from "./pages/Sellers";
import SellersDetails from "./pages/SellersDetails";
import ShoppingCart from "./pages/ShoppingCart";
import OrderDetails from "./pages/OrderDetails";
import Page404 from "./pages/Page404";
import DashboardContainer from "./pages/DashboardContainer";

// Components
import DarkModeToggle from "./components/DarkModeToggle";

// flowbite
import { ThemeInit } from "../.flowbite-react/init";
import { DarkThemeToggle } from "flowbite-react";
export default function App() {
  return (
    <>
      {/* <DarkModeToggle /> */}
      <DarkThemeToggle className="fixed right-5 bottom-5 p-1 border-none duration-200 rounded-full" />
      <ThemeInit />
      <DashboardContainer>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/Sellers" element={<Sellers />} />
          <Route path="/SellersDetails" element={<SellersDetails />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        {/* Routes */}
      </DashboardContainer>
    </>
  );
}
