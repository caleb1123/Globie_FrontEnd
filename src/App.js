import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import BuildPc from "./pages/BuildPc/BuildPc";
import PostProduct from "./pages/PostProduct/PostProduct";
import CreateStore from "./pages/CreateStore/CreateStore";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<ProductDetail />} path="/products/:id" />
          <Route element={<BuildPc />} path="/build-pc" />
          <Route element={<PostProduct />} path="/post-product" />
          <Route element={<CreateStore />} path="/create-store" />
        </Route>

        {/* auth route */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
