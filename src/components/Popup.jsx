import React from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ product, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleAddToCart = () => {
    // Add your logic to handle adding to the cart here
    handleClose(); // Close the popup after adding to cart
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <img 
              src={product.img} 
              alt={product.title} 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-base md:text-lg mb-4">{product.text}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xl md:text-2xl font-semibold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              {product.solde && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {product.solde}% Off
                </span>
              )}
            </div>
            <div className="mt-4">
              <button 
                type="button" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
