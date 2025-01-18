import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Table } from "flowbite-react";
import ProductsTable from "./ProductsTable/ProductsTable";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col  items-center h-screen bg-gray-300">
      <div className="container mx-auto mt-10 flex justify-between items-center">
        <div>
          <h2 className="text-8xl mb-5">Dashboard</h2>
          {user && <p>Welcome {user.email}</p>}
        </div>

        <Button color="blue" className="my-4" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <ProductsTable />
    </div>
  );
}

export default Dashboard;
