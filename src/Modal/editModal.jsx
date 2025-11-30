import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditModal = ({ product, closeModal }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description) {
      toast.error("All fields are required!");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a number greater than 0");
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
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      toast.success(`Product updated: ${data.title}`);

      closeModal();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
