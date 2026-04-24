import { NavLink } from "react-router-dom";
import { useState } from "react";
import { assets } from "../../assets/assets";

const menuItems = [
  { name: "Add Items", path: "/add", icon: assets.add_icon },
  { name: "List Items", path: "/list", icon: assets.order_icon },
  { name: "Orders", path: "/orders", icon: assets.order_icon },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 m-2 bg-gray-900 text-white rounded"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 text-gray-200 pl-4 border-r transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden mb-4 text-white"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 pt-6 pl-[14%] text-[15px]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300   transition-all duration-200 ${
                  isActive
                    ? "text-gray-950 bg-gray-200"
                    : "text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              {/* dynamic icon */}
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5 object-contain"
              />

              <p className="hidden md:block ">{item.name}</p>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
