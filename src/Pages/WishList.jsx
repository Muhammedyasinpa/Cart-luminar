import React from 'react'
import Header from '../Components/Header'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeWishlistItem } from '../REDUX/Slice/wishlistSlice'
import { addToCart } from '../REDUX/Slice/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WishList() {
  const cart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  const wishlist = useSelector(state => state.wishlistReducer)

  const handleCart = (product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      toast.success("Products added to your cart!!!")
    }else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
    }
  }


  
  return (
    <>
      <Header />
      <div style={{marginTop:'100px'}} className='container'>

      { wishlist?.length>0?  
      <Row>

        {wishlist?.map(product=>(
        <Col className="mb-5" sm={12} md={6} lg={4} xl={3}>
        <Card style={{ width: '18rem' }}>
          <Card.Img style={{height:'200px'}} variant="top" src={product?.thumbnail} />
          <Card.Body>
            <Card.Title>{product.title.slice(0,26)}...</Card.Title>
            <div className='d-flex justify-content-between'>
              <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn btn-light bg-dark'><i class="fa-solid fa-heart-circle-minus text-danger"></i></button>
              <button onClick={()=>handleCart(product)}  className='btn btn-light bg-dark'><i className='fa-solid fa-cart-plus text-success'></i></button>
            </div>
          </Card.Body>
        </Card>
        </Col>))}

      </Row>
      :
      <div style={{height:'70vh'}} className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <img  style={{width:'500px',height:'400px'}} src="https://cdn.dribbble.com/users/4240845/screenshots/8501281/empty-box-drib_4x.jpg" alt="" />
        <h1>Your Wishlist is Empty!!!</h1>
      </div>
      }
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default WishList