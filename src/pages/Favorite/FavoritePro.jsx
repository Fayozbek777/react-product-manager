import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritePro = ({ favorites }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Heart size={28} className="text-red-500" />
          Favorites
        </h1>

        {favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((product) => (
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
                  <Heart size={20} className="text-red-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FavoritePro;
