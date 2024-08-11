import React, { useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  setDecreaseItemQTY,
  setIncreaseItemQTY,
  setRemoveItemFromCart
} from "../../app/CartSlice.js";

const CartItem = ({ item, selectedSize, onSizeChange }) => {
  const {
    _id,
    title,
    text,
    img,
    color,
    shadow,
    price,
    cartQuantity,
    sizes,
    solde
  } = item;
  const dispatch = useDispatch();
  const [localSelectedSize, setLocalSelectedSize] = useState(
    selectedSize || (sizes && sizes.length > 0 ? sizes[0].toString() : "")
  );

  const discountedPrice = solde && solde > 0
    ? price - (price * solde / 100)
    : price;

  const handleSizeChange = (size) => {
    setLocalSelectedSize(size.toString());
    onSizeChange(size.toString());
  };

  return (
    <div className="flex items-center justify-between w-full px-5">
      <div className="flex items-center gap-5">
        <div
          className={`bg-gradient-to-b ${color} ${shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}
        >
          <img
            src={`https://api.bestofficiel.com${img}`}
            alt={`img/cart-item/${_id}`}
            className="w-36 h-auto object-fill lg:w-28"
          />
          <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
            {solde && solde > 0 ? (
              <>
                <span className="line-through">${price.toFixed(2)}</span>
                <span className="ml-2">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              `$${price.toFixed(2)}`
            )}
          </div>
        </div>
        <div className="grid items-center gap-4">
          <div className="grid items-center leading-none">
            <h1 className="font-medium text-lg text-slate-900 lg:text-sm">
              {title}
            </h1>
            <p className="text-sm text-slate-800 lg:text-xs">{text}</p>
          </div>
          {sizes && sizes.length > 0 && (
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`rounded py-1 px-2 text-white text-sm ${
                      localSelectedSize === size.toString()
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-around w-full">
          <button
            type="button"
            onClick={() => dispatch(setDecreaseItemQTY({ _id }))}
            className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90"
          >
            <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
          </button>
          <div className="bg-theme-cart rounded text-white font-medium lg:text-xs w-7 h-6 lg:h-5 lg:w-6 flex items-center justify-center">
            {cartQuantity}
          </div>
          <button
            type="button"
            onClick={() => dispatch(setIncreaseItemQTY({ _id }))}
            className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90"
          >
            <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => dispatch(setRemoveItemFromCart({ _id }))}
          className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90"
        >
          <TrashIcon className="w-5 h-5 lg:w-4 lg:h-4 text-red-500 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
