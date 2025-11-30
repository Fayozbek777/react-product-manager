import React from "react";
import { Home, Star, PlusCircle, User, ShoppingBag } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={22} /> },
    { name: "Favorites", path: "/favorites", icon: <Star size={22} /> },
  ];

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.4 },
    },
    tap: { scale: 0.9 },
  };

  const textVariants = {
    hover: { x: 3 },
    tap: { x: 0 },
  };

  return (
    <motion.nav
      className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ShoppingBag size={28} className="text-white" />
        </motion.div>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ModernShop
        </div>
      </motion.div>
      <ul className="flex gap-8">
        {navItems.map((item, index) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 group relative ${
                  isActive
                    ? "text-blue-600 bg-blue-50 shadow-inner"
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-blue-500"
                    }
                  >
                    {item.icon}
                  </motion.div>

                  <motion.span
                    variants={textVariants}
                    whileHover="hover"
                    className="font-semibold"
                  >
                    {item.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-200 rounded-2xl"
                      layoutId="activeNav"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 border border-gray-200 rounded-2xl opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl cursor-pointer group"
          whileHover="hover"
          whileTap="tap"
          variants={{
            hover: {
              scale: 1.05,
              background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
            },
            tap: { scale: 0.95 },
          }}
        >
          <User
            size={22}
            className="text-gray-600 group-hover:text-blue-600 transition-colors"
          />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
