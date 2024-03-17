import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../REDUX/Slice/productSlice'


function Header({insideHome}) {

 const dispatch=useDispatch()
  const cartCount=useSelector(state=>state.cartReducer).length

  const wishlistCount=useSelector(state=>state.wishlistReducer).length
  return (
    <>
      <Navbar style={{zIndex:100}} className='bg-info position-fixed w-100 top-0'>
        <Container >

          <div class="d-flex justify-content-evenly">
            <Link to={'/'} style={{ textDecoration: "none" }}>
              <Navbar.Brand style={{ color: "white", fontSize: "30px" }}>
                <i class="fa-solid fa-truck-fast fa-beat-fade fa-bounce fs-2 me-2" style={{ color: 'white' }}></i>
                <strong className='text-white'>E Cart</strong>
              </Navbar.Brand>
            </Link>
          </div>
       { insideHome &&
         <div className="d-flex">
              <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text" className='form-control me-1' placeholder='Search Products!!!' />
          </div>
          }

          <div class="d-flex flex-row-reverse bd-info">

              <div class="p-2 ">
                <Link to={'/cart'} style={{ textDecoration: "none" }}>
                  <i className="fa-solid fa-cart-shopping me-1" style={{color: "#FFD43B"}}></i>
                  <strong className='text-light'>CART</strong>
                  <span class="badge badge-pill badge-light text-danger bg-white ms-1">{cartCount}</span>
                </Link>
              </div>
              <div className="p-2 me-5">
                <Link to={'/wishlist'} style={{ textDecoration: "none" }}>
                  <i class="fa-solid fa-heart bd-highlight me-1"></i>
                   <strong className='text-light'>WISHLIST </strong>
                   <span class="badge badge-pill badge-light text-danger bg-white ms-1">{wishlistCount}</span>

                </Link>
              </div>
            </div>

        </Container>
      </Navbar>
    </>
  )
}

export default Header