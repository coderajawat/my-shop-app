import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { FaBagShopping } from "react-icons/fa6";
import { clearCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const checkout = () => {
    navigate("/");
    toast.success("Thanks For Shopping");
    dispatch(clearCart());
  }

  return (
    <div className="flex flex-col items-center">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row w-full max-w-6xl h-[90vh]">
          <div className="flex flex-col basis-2/3 pr-8 py-7 ml-8 overflow-y-auto scrollbar-hide">
            {cart.map((item, index) => {
              return <CartItem key={item.id} item={item} itemIndex={index} />;
            })}
          </div>
          <div className="flex flex-col basis-1/3 md:mt-0 md:sticky px-6 ml-2">
            <div className="flex flex-col mt-6 py-5 gap-2 w-">
              <div className="space-y-1 mb-2">
                <div className="font-semibold text-2xl text-green-800">
                  Your Cart
                </div>
                <div className="font-bold text-5xl text-green-700">
                  Summary
                </div>
              </div>
              <p className="text-xl">
                <span className="text-gray-700 font-semibold text-xl">
                  Total Items: {cart.length}
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-700">
                <span>Total Amount:</span> ${totalAmount}
              </p>
              <button onClick={checkout} className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-10 mb-10 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl">
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[90vh] justify-center items-center gap-2">
          <h1 className="text-gray-800 font-bold text-3xl mb-3">
            Cart is Empty
          </h1>
          <NavLink to="/">
            <button className="inline-flex overflow-hidden uppercase text-white mt-5 tracking-wider cursor-pointer">
              <span className="bg-purple-600 px-3.5 py-3.5 rounded-tl-lg rounded-bl-lg hover:bg-green-600 transition duration-300 ease-linear">
                <FaBagShopping size={24} />
              </span>
              <span className="bg-slate-900 py-3.5 px-5 rounded-tr-lg rounded-br-lg font-semibold">
                Shop Now
              </span>
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
