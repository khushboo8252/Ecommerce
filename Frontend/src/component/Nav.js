import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">E-com Dashboard</h1>
        <ul className="flex flex-col sm:flex-row gap-4 text-sm sm:text-base">
          {auth && JSON.parse(auth) ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-500 transition duration-200"
                >
                  Logout ({JSON.parse(auth).name})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
