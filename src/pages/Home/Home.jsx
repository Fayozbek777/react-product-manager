import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Heart, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/apiSlice";
import Loader from "../../components/Loader/Loader";

const Home = ({ favorites, toggleFavorite }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // "price" yoki "name"

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, searchTerm, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart size={28} />
            Products
          </h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded px-3 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Sort */}
          <select
            className="border rounded px-3 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        {isLoading && <Loader />}
        {error && <p>Error fetching products</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
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
                  onClick={() => toggleFavorite(product)}
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
    </div>
  );
};

export default Home;
