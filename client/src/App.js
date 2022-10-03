import "./App.css";

import { Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/login-and-register/Login/Login";
import Register from "./Pages/login-and-register/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ProductAdd from "./Pages/ProductAdd/ProductAdd";
function App() {
  return (
    <div className="container mx-auto px-0 lg:px-4">
      <Navbar />

      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/product/item/:id" element={<ProductDetails />} />
        <Route path="/product/add" element={<ProductAdd />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
