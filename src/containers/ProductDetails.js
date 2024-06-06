import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="container mx-auto p-6">
      {Object.keys(product).length === 0 ? (
        <div className="text-center">...Loading</div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/2 p-4">
              <img className="w-full h-auto object-cover rounded-lg" src={image} alt={title} />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <h2 className="text-2xl text-teal-600 font-semibold mb-4">${price}</h2>
              <h3 className="text-xl text-gray-600 mb-4">{category}</h3>
              <p className="text-gray-700 mb-6">{description}</p>
              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
