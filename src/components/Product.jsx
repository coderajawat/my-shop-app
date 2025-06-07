import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slices/CartSlice";

const Product = ({ post }) => {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 max-w-[300px] transition-all duration-300 ease-in-out p-4 mt-12 rounded-xl shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-gray-300 hover:bg-gray-100 group focus-within:scale-110 focus-within:bg-gray-100 focus-within:shadow-xl" tabIndex={0}>
      <div className="flex items-center justify-center w-full">
        <p className="text-gray-700 font-semibold text-lg text-center truncate w-full px-2 mt-1">
          {post.title}
        </p>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-normal text-[10px] px-2 text-center">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[180px] md:h-[180px] w-full flex justify-center">
        <img src={post.image} className="h-full w-auto object-contain" />
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-bold">${post.price}</p>
        </div>
        {cart.some((p) => p.id === post.id) ? (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] py-1 px-4 uppercase hover:bg-gray-600 hover:text-white transition duration-300 ease-in group focus-within:bg-gray-700 focus-within:text-white"
            onClick={removeFromCart}
          >
            Remove Item
          </button>
        ) : (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] py-1 px-4 uppercase hover:bg-gray-600 hover:text-white transition duration-300 ease-in group focus-within:bg-gray-700 focus-within:text-white"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
