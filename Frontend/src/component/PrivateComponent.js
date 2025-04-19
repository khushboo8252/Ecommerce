import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const auth = localStorage.getItem('user');
  return auth ? (
    <Outlet />
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <p className="text-lg font-semibold text-red-600 mb-4">Access Denied</p>
        <p className="text-gray-700 mb-6">You must be signed in to view this page.</p>
        <Navigate to="/signup" />
      </div>
    </div>
  );
};

export default PrivateComponent;
