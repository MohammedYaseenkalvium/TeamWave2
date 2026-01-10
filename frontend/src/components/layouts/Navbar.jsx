import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSideMenu]);

  return (
    <>
      <header className="flex items-center gap-4 bg-slate-950 border-b border-slate-800 py-3 px-5 sticky top-0 z-40">
        
        <button
          className="block lg:hidden text-slate-200 hover:text-white transition"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            className="h-9 w-9 object-contain"
            alt="TeamWave Logo"
          />
          <span className="font-semibold tracking-tight text-slate-100">
            TeamWave
          </span>
        </div>
      </header>

      
      {openSideMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      
      {openSideMenu && (
        <aside className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-slate-950 border-r border-slate-800 z-40 overflow-y-auto lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </aside>
      )}
    </>
  );
};

export default Navbar;
