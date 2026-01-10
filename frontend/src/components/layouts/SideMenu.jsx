import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const SideMenu = ({ activeMenu, collapsed, setCollapsed }) => {
  const { user, clearUser } = useContext(UserContext);
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div className="h-full bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        {!collapsed && (
          <span className="font-semibold text-slate-100">
            TeamWave
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-800 transition"
        >
          {collapsed ? (
            <LuChevronRight />
          ) : (
            <LuChevronLeft />
          )}
        </button>
      </div>

      {/* USER INFO */}
      {!collapsed && (
        <div className="flex flex-col items-center py-5 border-b border-slate-800">
          <img
            src={user?.profileImage}
            className="w-16 h-16 rounded-full object-cover"
            alt="profile"
          />

                  {user?.role === "admin" && (
          <div className="
              text-[10px] font-semibold tracking-wide uppercase
              text-indigo-200
              bg-gradient-to-r from-indigo-500/20 via-indigo-400/20 to-blue-500/20
              border border-indigo-400/40
              px-3 py-0.5 rounded-full mt-1
              shadow-[0_0_10px_rgba(99,102,241,0.35)]
              animate-pulse
            ">
              Admin
            </div>
        )}

        {user?.role === "member" && (
          <div className="text-[10px] font-semibold tracking-wide uppercase
                text-emerald-200
                bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-teal-500/20
                border border-emerald-400/40
                px-3 py-0.5 rounded-full mt-2
                shadow-[0_0_8px_rgba(16,185,129,0.3)]">
            Member
          </div>
)}

          <p className="mt-2 text-sm font-medium">
            {user?.name}
          </p>
          <p className="text-xs text-slate-400">
            {user?.email}
          </p>
        </div>
      )}

      {/* MENU */}
      <div className="flex-1 py-3">
        {menuData.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={index}
              title={collapsed ? item.label : ""}
              onClick={() => handleClick(item.path)}
              className={`
                w-full flex items-center gap-4
                px-4 py-3
                text-sm
                transition
                ${
                  isActive
                    ? "bg-slate-800 text-blue-400 border-r-2 border-blue-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }
              `}
            >
              <item.icon className="text-xl shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
