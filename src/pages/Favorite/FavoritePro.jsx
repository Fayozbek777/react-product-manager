import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FavoritePro = ({ favorites, toggleFavorite }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const handleRemoveFavorite = (product) => {
    toggleFavorite(product);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-rose-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group block"
                >
                  <ArrowLeft
                    size={20}
                    className="text-gray-600 group-hover:text-blue-600"
                  />
                </Link>
              </motion.div>

              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Heart size={32} className="text-red-500 fill-current" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    Favorites
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "item" : "items"} saved
                  </p>
                </div>
              </div>
            </div>

            {favorites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-semibold"
              >
                {favorites.length}{" "}
                {favorites.length === 1 ? "Favorite" : "Favorites"}
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {favorites.length === 0 ? (
              <motion.div
                variants={emptyStateVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="p-6 bg-white rounded-3xl shadow-lg mb-6"
                >
                  <Heart size={64} className="text-gray-400" />
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-700 mb-4">
                  No favorites yet
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-md">
                  Start exploring our products and add your favorites to this
                  list!
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl"
                  >
                    <ShoppingBag size={20} />
                    Explore Products
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence>
                  {favorites.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover="hover"
                      layout
                      className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        {/* Remove button */}
                        <motion.button
                          onClick={() => handleRemoveFavorite(product)}
                          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#fee2e2",
                          }}
                          whileTap={{ scale: 0.9 }}
                          title="Remove from favorites"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </motion.button>

                        {/* Product content */}
                        <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 pr-8">
                          {product.title}
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                          {product.description?.slice(0, 60)}...
                        </p>

                        <motion.p
                          className="font-bold text-2xl mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          ${product.price}
                        </motion.p>

                        {/* Bottom actions */}
                        <div className="flex justify-between items-center">
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              to={`/products/${product.id}`}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                            >
                              More Info
                              <motion.span
                                initial={{ x: -5, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                              >
                                →
                              </motion.span>
                            </Link>
                          </motion.div>

                          <motion.div
                            className="flex items-center gap-1 text-red-500"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            <Heart size={20} fill="currentColor" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default FavoritePro;
