import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import wishlistSlice from "./Slice/wishlistSlice";
import cartSlice from "./Slice/cartSlice";

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice

    }
})

export default cartStore