import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit, Image } from "lucide-react";

const EditModal = ({ product, closeModal }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price?.toString() || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
      setImage(product.image || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !price || !description || !category) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a number greater than 0");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            price: Number(price),
            description,
            category,
            image:
              image ||
              "https://via.placeholder.com/300/FFFFFF/000000?text=Product+Image",
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      toast.success(`Product updated: ${data.title}`);
      closeModal();
    } catch (err) {
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="relative p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <motion.button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-white rounded-full transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-gray-500" />
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-green-600 rounded-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                <Edit size={24} className="text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Product
                </h2>
                <p className="text-gray-600 text-sm">
                  Update product information
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                placeholder="Enter product title"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <button
                  type="button"
                  className="px-4 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setImage(
                      "https://via.placeholder.com/300/FFFFFF/000000?text=Product+Image"
                    )
                  }
                >
                  <Image size={20} className="text-gray-500" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                placeholder="Enter product description"
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  "Update Product"
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModal;
