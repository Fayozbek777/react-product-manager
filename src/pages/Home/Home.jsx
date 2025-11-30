import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Star, PlusCircle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Product One",
      price: 49.99,
      shortDesc: "This is product one",
      favorite: true,
    },
    {
      id: 2,
      name: "Product Two",
      price: 29.99,
      shortDesc: "This is product two",
      favorite: false,
    },
    {
      id: 3,
      name: "Product Three",
      price: 99.99,
      shortDesc: "This is product three",
      favorite: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart size={28} />
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.shortDesc}</p>
              <p className="font-bold mb-4">${product.price.toFixed(2)}</p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  More Info
                </Link>

                <button className="text-yellow-500">
                  {product.favorite ? <Star size={20} /> : <Star size={20} />}
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
