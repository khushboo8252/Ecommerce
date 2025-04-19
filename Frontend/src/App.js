import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Signup from "./component/Signup";
import PrivateComponent from "./component/PrivateComponent";
import Login from "./component/Login";
import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList";
import UpdateProduct from "./component/UpdateProduct"; // ✅ Fixed typo

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <BrowserRouter>
        {/* Navbar */}
        <Nav />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1 className="text-center text-xl">Logout Component</h1>} />
              <Route path="/profile" element={<h1 className="text-center text-xl">Profile Component</h1>} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
