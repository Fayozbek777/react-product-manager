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

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products;
  }, [products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex justify-end p-6 bg-gray-100">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart size={28} />
          Products
        </h1>

        {isLoading && <Loader />}
        {error && <p>Error fetching products</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">
                {product.description?.slice(0, 50)}...
              </p>
              <p className="font-bold mb-4">${product.price}</p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  More Info
                </Link>
                <button
                  onClick={() => handleFavoriteClick(product)}
                  className={`${
                    isFavorite(product.id) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      {showAddModal && <AddModal closeModal={() => setShowAddModal(false)} />}
      {showEditModal && (
        <EditModal
          product={selectedProduct}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
