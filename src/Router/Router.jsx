import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProtInfo from "../pages/ProInfo/ProtInfo";
import NotFound from "../components/NotFound/NotFound";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProtInfo />} />
        <Route path="/notfoundpage" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Router;
