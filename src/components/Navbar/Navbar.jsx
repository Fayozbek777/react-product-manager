import React from "react";
import { Home, Star, PlusCircle, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Favorites", path: "/favorites", icon: <Star size={20} /> },
  ];

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Product SPA</div>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-yellow-300 ${
                  isActive ? "text-yellow-300 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
