import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {remove} from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";


const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item Removed");
  };

  return (
    <div className='flex flex-col md:flex-row w-full items-center justify-between border-slate-600 border-b-2 mb-4'>
      <div className='relative flex flex-wrap items-center justify-center md:justify-between md:flex-nowrap p-4 gap-8'>
        <div className='w-[150px] h-auto flex-shrink-0 ml-2 mb-2'>
          <img src={item.image} className="w-full object-contain" alt="item" />
        </div>
        <div className='ml-4 flex flex-col gap-4'>
          <h1 className="text-2xl text-slate-700 font-semibold">{item.title}</h1>
          <h1 className="text-base text-slate-600 font-medium">{item.description.split(" ").slice(0, 15).join(" ") + "..."}</h1>
          <div className="flex items-center justify-between mt-8">
            <p className="font-bold text-xl text-green-600">${item.price}</p>
            <div onClick={removeFromCart} className="text-red-400 bg-red-200 group hover:bg-red-400 hover:text-red-800 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3">
              <MdDelete size={18}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
