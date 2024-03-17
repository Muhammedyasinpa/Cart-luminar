import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slice/wishlistSlice'
import { addToCart } from '../REDUX/Slice/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {

  const wishlist =useSelector(state=>state.wishlistReducer)
  const cart=useSelector(state=> state.cartReducer)

  const dispatch =useDispatch()
  
  
 
  const [product,setProduct]=useState({})
  const {id}=useParams()
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts=JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])
  // console.log(product);
  const handleWishlist=(product)=>{
    if(wishlist?.includes(product)){
      toast.info("Items already in your wishlist!!!")
    }else{
      dispatch(addWishlistItem(product))
    }
  }

  const HandleCart=(product)=>{
    if(cart?.includes(product)){
      dispatch(addToCart(product))
      toast.success("Product add to your cart!!!")
    }else{
      dispatch(addToCart(product))
      toast.success("Products add to your cart!!!")

    }
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col>
            <img width={'400px'}  height={"400px"} src={product?.thumbnail} alt="" />

          </Col>
          <Col>
            <div>
              <h5>PID: {product?.id}</h5>
              <h1>{product?.title}</h1>
              <h3 className='text-primary'>$ <strong>{product?.price}</strong></h3>
              <p style={{ textAlign: "justify" }}><b>Description: </b> {product?.description}</p>
              <div className='d-flex justify-content-between'>
                <Button onClick={()=>handleWishlist(product)} variant="outline-dark"><i className='fa-solid fa-heart text-primary me-1'></i>Add To Wishlist</Button>
                <Button onClick={()=>HandleCart(product)} variant="outline-dark"><i className='fa-solid fa-cart-plus text-success me-1'></i>Add To Cart</Button>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default View