import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        addWishlistItem:(state,action)=>{
            state.push(action.payload)
        },
        removeWishlistItem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        }
        
    }
})
// its for the component
export const {addWishlistItem,removeWishlistItem}=wishlistSlice.actions
//its for the store
export default wishlistSlice.reducer