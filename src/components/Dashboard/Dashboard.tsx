import React from "react";
import { useAuth } from "../../context/AuthContext";
import ProductsTable from "./ProductsTable/ProductsTable";
import NavigationSidebar from "../NavigationSidebar/NavigationSidebar";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <NavigationSidebar />

      <div className="flex-1 p-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold text-blue-600">Dashboard</h2>

          {user && (
            <p className="text-lg text-gray-700 mb-4">
              Welcome back, {user.email}
            </p>
          )}
          <div className="bg-white rounded-lg shadow p-8">
            <ProductsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
