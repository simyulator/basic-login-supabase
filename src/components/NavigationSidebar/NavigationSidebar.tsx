import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Sidebar } from "flowbite-react";
import { FaHome, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", link: "#", icon: FaHome },
  { label: "Products", link: "#", icon: FaBox },
  { label: "Settings", link: "#", icon: FaCog },
];

const NavigationSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Sidebar aria-label="Navigation sidebar" className="h-full">
      <Sidebar.Items>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Bots Pvt Ltd.</h1>
        </div>
        <Sidebar.ItemGroup className="m-0">
          {menuItems.map((item, index) => (
            <Sidebar.Item key={index} href={item.link} icon={item.icon}>
              {item.label}
            </Sidebar.Item>
          ))}
          <div className="mt-auto">
            <Sidebar.Item
              onClick={handleLogout}
              className="cursor-pointer "
              icon={FaSignOutAlt}
            >
              Logout
            </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default NavigationSidebar;
