import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";


export const fetchProduct=createAsyncThunk('product/fetchProduct',async()=>{
    const response =await axios.get("https://dummyjson.com/products")
    // console.log(response.data.products);
    sessionStorage.setItem("allProducts",JSON.stringify(response.data.products))
    return response.data.products

})

const productSlice=createSlice({
    name:"product",
    initialState:{
        allProducts:[],
        allProductsDummy:[],
        // to handle api there will be a chance to reject the api call
        error:"",
        loading:false //there stage called pending stage that there will be delay
    },
    reducers:{
            searchProduct:(state,action)=>{
                state.allProducts=state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
            }
        // cant handle promise
    },
    // to handle promise we use createAsyncThunk 
    // createAsyncThunk cant taken by reducers there for we use extraReducers
    extraReducers:(builder)=>{
        // state is used to control to initialState of the slice
        // action is used to logic
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.allProducts=action.payload
            state.allProductsDummy=action.payload
            state.error=""

        })
        
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.loading=true
            state.allProducts=[]
            state.error=""
        })
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false
            state.allProducts=[]
            state.error="API Call Failed... Please Try after some time!!!!"
        })
    }
})
export const {searchProduct}=productSlice.actions
export default productSlice.reducer
