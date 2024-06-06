import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={id}>
        <Link to={`/product/${id}`} className="block hover:shadow-lg transition-shadow duration-200">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-48 flex justify-center items-center overflow-hidden">
              <img src={image} alt={title} className="max-h-full" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg mb-2">{title}</div>
              <div className="text-gray-700 mb-2">$ {price}</div>
              <div className="text-gray-500 text-sm">{category}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <div className="flex flex-wrap">{renderList}</div>;
};

export default ProductComponent;
