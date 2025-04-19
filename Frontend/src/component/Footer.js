import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-lg font-semibold text-center sm:text-left">
          E-com Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-2 sm:mt-0 text-center sm:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
