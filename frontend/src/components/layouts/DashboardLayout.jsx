import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Navbar />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`hidden lg:block transition-all duration-300 ${
              collapsed ? "w-20" : "w-64"
            }`}
          >
            <SideMenu
              activeMenu={activeMenu}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 bg-slate-900">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
