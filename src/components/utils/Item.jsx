import React from 'react';
import { useDispatch } from 'react-redux';
import { StarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { setAddItemToCart, setOpenCart } from '../../app/CartSlice';
import { useNavigate } from 'react-router-dom';

const Item = ({
  ifExists,
  _id,
  color,
  shadow,
  title,
  text,
  img, // Ensure this is an array
  btn,
  rating,
  price,
  sizes,
  solde,
  itemType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddToCart = () => {
    const item = {
      _id,
      title,
      text,
      img: img[0], // Pass only the first image
      color,
      shadow,
      price,
      sizes,
      solde,
      productId: _id,
    };
    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const handleDetailsClick = () => {
    navigate(`/product/${_id}`);
  };

  const newPrice = solde ? price - (price * solde) / 100 : price;

  const itemStyles = itemType === 'watch'
    ? 'w-[200px] h-[300px] p-4'
    : 'w-full hover:scale-105';

  const imageStyles = itemType === 'watch'
    ? 'h-48 w-48 object-contain'
    : 'w-full h-auto object-contain';

  const textColor = color.includes('bg-white') ? 'text-black' : 'text-slate-200';

  return (
    <div
      className={`relative z-10 bg-gradient-to-b ${color} ${shadow} grid items-center ${
        ifExists ? 'justify-items-start' : 'justify-items-center'
      } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out ${itemStyles}`}
    >
      <div
        className={`grid items-center ${
          ifExists ? 'justify-items-start' : 'justify-items-center'
        }`}
      >
        <h1 className={`text-xl lg:text-lg md:text-base font-medium filter drop-shadow ${textColor}`}>
          {title}
        </h1>
        <p className={`filter drop-shadow text-base md:text-sm font-normal ${textColor}`}>
          {text}
        </p>

        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex flex-col items-start bg-white/80 px-1 rounded blur-effect-theme">
            {solde ? (
              <>
                <div className="text-black text-sm font-medium line-through">
                  ${price.toFixed(2)}
                </div>
                <div className="text-black text-sm font-medium">
                  ${newPrice.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-black text-sm font-medium">
                ${price.toFixed(2)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-slate-100">
              {rating}
            </h1>
          </div>
        </div>

        {solde && (
          <div className="flex items-center bg-white/80 px-1 rounded blur-effect-theme">
            <h1 className="text-black text-sm font-medium">
              Solde: {solde}%
            </h1>
          </div>
        )}

        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="relative z-10 bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
            onClick={() => {
              onAddToCart();
              onCartToggle();
            }}
          >
            <ShoppingBagIcon className="icon-style text-slate-900" />
          </button>
          <button
            type="button"
            className="relative z-10 bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
            onClick={handleDetailsClick}
          >
            View Details
          </button>
        </div>
      </div>
      <div
        className={`flex items-center ${
          ifExists ? 'absolute top-5 right-1' : 'justify-center'
        }`}
      >
        <img
          src={`https://api.bestofficiel.com${img[0]}`} // Use the first image from the array
          alt={`img/item-img/${_id}`}
          className={`transitions-theme ${imageStyles}`}
        />
      </div>
    </div>
  );
};

export default Item;
