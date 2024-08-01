import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      } else {
        const newItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(newItem);
        toast.success(`${action.payload.title} added to Cart`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      CartSlice.caseReducers.setGetTotals(state, { type: 'cart/setGetTotals' }); // Recalculate totals
    },

    setRemoveItemFromCart: (state, action) => {
      const updatedItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = updatedItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed From Cart`);
      CartSlice.caseReducers.setGetTotals(state, { type: 'cart/setGetTotals' }); // Recalculate totals
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        CartSlice.caseReducers.setGetTotals(state, { type: 'cart/setGetTotals' }); // Recalculate totals
      }
    },

    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decreased`);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        CartSlice.caseReducers.setGetTotals(state, { type: 'cart/setGetTotals' }); // Recalculate totals
      }
    },

    setClearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`Cart Cleared`);
      CartSlice.caseReducers.setGetTotals(state, { type: 'cart/setGetTotals' }); // Recalculate totals
    },

    setGetTotals: (state) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (totals, item) => {
          const { price, solde, cartQuantity } = item;
          const discountedPrice = solde ? price - (price * solde / 100) : price;
          const itemTotal = discountedPrice * cartQuantity;

          totals.totalAmount += itemTotal;
          totals.totalQuantity += cartQuantity;

          return totals;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItems,
  setGetTotals,
} = CartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default CartSlice.reducer;
