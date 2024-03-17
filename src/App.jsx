import './App.css'
import Cart from './Pages/Cart'
import Footer from './Components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import View from './Pages/View'
import WishList from './Pages/WishList'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      <Route path='view/:id' element={<View/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
      
    </>
  )
}

export default App
