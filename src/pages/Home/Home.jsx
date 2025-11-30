import React, { useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Heart, ShoppingCart, Trash2, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/apiSlice";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import AddModal from "../../Modal/addModal";
import EditModal from "../../Modal/editModal";
import { motion, AnimatePresence } from "framer-motion";

const Home = ({ favorites, toggleFavorite }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const handleFavoriteClick = (product) => {
    toggleFavorite(product);
    if (favorites.find((p) => p.id === product.id)) {
      toast(`Removed from favorites: ${product.title}`, { icon: "💔" });
    } else {
      toast(`Added to favorites: ${product.title}`, { icon: "❤️" });
    }
  };

  const handleDelete = (product) => {
    toast(`Deleted: ${product.title}`, { icon: "🗑️" });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const filteredProducts = useMemo(() => products || [], [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    tap: { scale: 0.98, y: 0 },
  };

  const heartVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.3 },
    tap: { scale: 0.8 },
    favorite: {
      scale: [1, 1.4, 1.2],
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="flex justify-end p-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <motion.button
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-lg"
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          Add Product
        </motion.button>
      </div>
      <main className="flex-1 p-6">
        {isLoading && <Loader />}
        {error && (
          <p className="text-red-500 text-center">Error fetching products</p>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description?.slice(0, 50)}...
                </p>
                <p className="font-bold mb-4">${product.price}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    More Info →
                  </Link>
                  <motion.button
                    onClick={() => handleFavoriteClick(product)}
                    variants={heartVariants}
                    animate={isFavorite(product.id) ? "favorite" : "initial"}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite(product.id)
                        ? "text-red-500 bg-red-50"
                        : "text-gray-400 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={isFavorite(product.id) ? "currentColor" : "none"}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />

      <AnimatePresence>
        {showAddModal && <AddModal closeModal={() => setShowAddModal(false)} />}
        {showEditModal && (
          <EditModal
            product={selectedProduct}
            closeModal={() => setShowEditModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
