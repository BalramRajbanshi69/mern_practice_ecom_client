import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Sign_Up from "./components/Sign_Up";
import Login from "./components/Login";
import ProductState from "./context/ProductState";
import CartItems from "./components/CartItems";
import AddProduct from "./components/AddProduct";
import Toast from "./ToastComponent/Toast";
import Products from "./components/Products";
import SearchResult from "./components/SearchResult";


const App = () => {
  return (
    <ProductState>
      <Router>
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sign_up" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart_items" element={<CartItems />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/search/:searchQuery" element={<SearchResult />} />
        </Routes>
      </Router>
    </ProductState>
  );
};

export default App;
