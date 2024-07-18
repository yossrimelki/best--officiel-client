import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCartItems,
    selectCartState,
    selectTotalAmount,
    selectTotalQTY,
    setClearCartItems,
    setCloseCart,
    setGetTotals
} from "../app/CartSlice";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import { createCommande } from "../api";
import emailjs from "emailjs-com";

const Cart = () => {
    const dispatch = useDispatch();
    const ifCartState = useSelector(selectCartState);
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotalAmount);
    const totalQTY = useSelector(selectTotalQTY);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        phone: ""
    });
    const [selectedSizes, setSelectedSizes] = useState({});

    useEffect(() => {
        dispatch(setGetTotals());
    }, [cartItems, dispatch]);

    const onCartToggle = () => {
        dispatch(setCloseCart({ cartState: false }));
    };

    const onClearCartItems = () => {
        dispatch(setClearCartItems());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSizeChange = (itemId, size) => {
        setSelectedSizes({
            ...selectedSizes,
            [itemId]: size
        });
    };

    const handleCheckoutClick = () => {
        setShowPopup(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.location || !formData.phone) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Prepare items array with required fields including productId
            const items = cartItems.map((item) => ({
                title: item.title,
                _id: item._id, // Ensure _id is used as productId
                productType: "Shoes", // Adjust productType as per your data
                quantity: item.cartQuantity,
                price: item.price,
            }));

            const commandeData = {
                name: formData.name,
                phone: formData.phone,
                items: items,
                totalAmount: totalAmount,
                deliveryAddress: formData.location,
                paymentMethod: "placeholder_payment_method",
                orderDate: new Date(),
            };

            console.log('Sending payload to backend:', JSON.stringify(commandeData, null, 2));

            // Call createCommande function from API
            const response = await createCommande(commandeData);
            console.log('Commande created:', response);

            // Prepare email template parameters
            const templateParams = {
                name: formData.name,
                email: formData.email,
                location: formData.location,
                phone: formData.phone,
                cartItems: cartItems.map((item) => ({
                    title: item.title,
                    price: item.price,
                    cartQuantity: item.cartQuantity,
                    sizes: item.sizes,
                    selectedSize: selectedSizes[item._id], // Use _id for selectedSize
                })),
            };

            console.log("templateParams:", templateParams);

            // Send email using emailjs.com
            emailjs.send('service_upneb3e', 'template_w19jcug', templateParams, 'YOUR_EMAILJS_USER_ID')
                .then(
                    (result) => {
                        console.log(result.text);
                        setShowPopup(false);
                        onClearCartItems();
                        alert("Order placed successfully!");
                    },
                    (error) => {
                        console.error("Failed to send email:", error);
                        alert("Failed to place order. Please try again.");
                    }
                );

        } catch (error) {
            console.error('Failed to create commande:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Failed to place order: ${error.response.data.message}`);
            } else {
                alert("Failed to place order. Please try again.");
            }
        }
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
                    ifCartState
                        ? "opacity-100 visible translate-x-0"
                        : "opacity-0 invisible translate-x-8"
                }`}
            >
                <div
                    className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0 ${
                        ifCartState
                            ? "opacity-100 visible translate-x-0"
                            : "opacity-0 invisible translate-x-8"
                    }`}
                >
                    <CartCount
                        totalQTY={totalQTY}
                        onCartToggle={onCartToggle}
                        onClearCartItems={onClearCartItems}
                    />
                    {cartItems?.length === 0 ? (
                        <CartEmpty onCartToggle={onCartToggle} />
                    ) : (
                        <div>
                            <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
                                {cartItems?.map((item, i) => (
                                    <CartItem
                                        key={i}
                                        item={item}
                                        selectedSize={selectedSizes[item._id]} // Use _id for selectedSize
                                        onSizeChange={(size) => handleSizeChange(item._id, size)} // Use _id for item.id
                                    />
                                ))}
                            </div>

                            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                                    <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                                        ${totalAmount}
                                    </h1>
                                </div>
                                <div className="grid items-center gap-2">
                                    <p className="text-sm font-medium text-center">
                                        Taxes and Shipping Will Calculate At Shipping
                                    </p>
                                    <button
                                        type="button"
                                        className="button-theme bg-theme-cart text-white"
                                        onClick={handleCheckoutClick}
                                    >
                                        Check Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[300]">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <p>Total Amount: ${totalAmount}</p>
                        <div className="mb-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="mb-2 border-b border-gray-200 pb-2">
                                    <p>Product: {item.title}</p>
                                    <p>Unit Price: ${item.price}</p>
                                    <p>Quantity: {item.cartQuantity}</p>
                                    {item.sizes && (
                                        <p>Size: {selectedSizes[item._id]}</p> // Use _id for selectedSizes
                                    )}
                                    <p>Total: ${item.price * item.cartQuantity}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Delivery Address
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your delivery address"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="button-theme bg-gray-300 text-black mr-2"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="button-theme bg-theme-cart text-white"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;

