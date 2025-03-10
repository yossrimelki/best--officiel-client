import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWatches, getShoes } from '../api';
import { useDispatch } from 'react-redux';
import { setAddItemToCart } from '../app/CartSlice'; // Import your action

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const watchesData = await getWatches();
        const shoesData = await getShoes();

        const allProducts = [...watchesData, ...shoesData];
        const productDetails = allProducts.find(product => product._id === id);

        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(setAddItemToCart(product)); // Dispatch the action to add the product to the cart
    }
  };

  if (!product) return <p className="text-center mt-8">Loading...</p>;

  const { img = [], title, text, price, solde } = product;
  const mainImage = img[0]; // Assuming the first image is the main image
  const additionalImages = img.slice(1); // Other images for scrolling

  return (
    <div className="flex flex-col items-center py-12 px-4 max-w-4xl mx-auto">
      <div className="w-full md:flex md:gap-8">
        {/* Main Image */}
        <div className="w-full md:w-1/2">
          {mainImage && (
            <img
              src={`https://api.bestofficiel.com${mainImage}`}
              alt={title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">{text}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-semibold text-gray-800">
              ${price.toFixed(2)}
            </span>
            {solde && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                {solde}% Off
              </span>
            )}
          </div>
          <div className="mt-4">
            <button 
              type="button" 
              className='button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'
              onClick={handleAddToCart} // Attach the event handler
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Images Scrolling Gallery */}
      {additionalImages.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-xl font-semibold mb-4">More Images</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {additionalImages.map((image, index) => (
              <img
                key={index}
                src={`https://api.bestofficiel.com${image}`}
                alt={`${title} - ${index}`}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
