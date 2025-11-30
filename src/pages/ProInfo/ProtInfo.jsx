import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/apiSlice";
import Loader from "../../components/Loader/Loader";

const ProtInfo = () => {
  const { id } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading product</p>;

  const product = products?.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="font-bold mb-2">${product.price}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
    </div>
  );
};

export default ProtInfo;
