import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/Slice/cartSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const Navigate=useNavigate()
  const cartItems =useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal]=useState(0)
  const dispatch= useDispatch()

  const handleDecrementQuantity=(product)=>{
    if (product.quantity>1){
      dispatch(decQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const HandleCheckOut=()=>{
   dispatch(emptyCart())
   toast.success("Order Placed Successfully")
   setTimeout(()=>{
    Navigate("/")
},3000)
    
    
  }

  useEffect(()=>{
    if(cartItems?.length>0){
      setCartTotal(cartItems?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
    }else{
      setCartTotal(0)
    }

  },[cartItems])

  return (
    <>
      <Header/>
    <Container style={{marginTop:"100px"}}>
      

    { cartItems?.length>0?  

      <div className="pt-5">
        <h1>Cart Summary</h1>
        <div className="row mt-5">
          <div className="col-lg-8">
            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>...</th>

                </tr>
              </thead>
              <tbody>
              {cartItems?.map((product,index)=>(
               <tr>
                  <td>{index+1}</td>
                  <td>{product?.title}</td>
                  <td><img  height={"60px"} width={"60px"} src={product?.thumbnail} alt="" /></td>
                  <td>
                    <div className="d-flex">
                      <button onClick={()=>handleDecrementQuantity(product)} className='btn fw-bolder'>-</button>
                      <input style={{width:"50px"}} className='form-control' type="text" placeholder={product?.quantity} readOnly/>
                      <button onClick={()=>dispatch(incQuantity(product?.id))} className='btn fw-bolder'>+</button>

                    </div>
                  </td>
                  <td>$ {product?.totalPrice}</td>
                  <td><button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn'><i className='fa-solid fa-trash text-primary'></i></button></td>
                </tr>
                ))}
              </tbody>

            </table>
            <div className="float-end mt-3">
                <button onClick={()=>dispatch(emptyCart())} className='btn btn-primary me-5'>EMPTY CART</button>
                <button className='btn btn-danger'>Shop More</button>
              </div>
          </div>
          <div className="col-lg-4">
              <div className="shadow border-rounded p-4">
                <h5>Total Items: <b className='text-primary'>{cartItems?.length}</b> </h5>
                <h5>Total Amount: <b className='text-primary'>{cartTotal}</b> </h5>
                <div className="d-grid mt-4">
                  <Link onClick={HandleCheckOut} className='btn btn-success'>Check Out</Link>
                </div>
              </div>
          </div>
        </div>
      </div>

      :

      <div>
        <div className="w-100 d-flex justify-content-center align-items-center flex-colum">
          <img width={"500px"} src="https://static.vecteezy.com/system/resources/previews/024/098/226/original/happy-man-with-shopping-cart-free-png.png" alt="" />
        </div>
        <h1 className='text-center mb-5'><strong>Your Cart Is Empty!!!</strong></h1>
      </div>
      }

      </Container>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Cart