import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import photo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../Context/Context'
import { CartContext } from '../CartContext/CartContext'

export default function Navbar() {
  let {userToken , setUserToken} = useContext(UserContext)
  let {cartCount , countFav} = useContext(CartContext)
  let navigate= useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
   <Link to=''> <img src={photo} alt="navbar photo" /></Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken !==null ? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
           <Link className="nav-link" to="cart">Cart <i className='fa-solid fa-cart-shopping text-main'></i> 
           <span>{cartCount}</span>
            </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="favorite"><i className="fas fa-heart text-main"></i>
          <span>{countFav}</span>
          </Link>
        </li>
        </> : ''}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <ul className="navbar-nav gap-2 d-flex align-items-center mx-2">
        <li className="nav-item">
        <i className="fa-brands fa-facebook-f"></i>
        </li>
        <li className="nav-item">
        <i className="fa-brands fa-twitter"></i>
        </li>
        <li className="nav-item">
        <i className="fa-brands fa-instagram"></i>
        </li>
        <li className="nav-item">
        <i className="fa-brands fa-youtube"></i>
        </li>
     
        {userToken !== null? <>
        <li className="nav-item">
          <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
        </li>
        </>: <>
        <li className="nav-item">
          <Link className="nav-link " to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Register">Register</Link>
        </li>
        </>}
      </ul>

      </ul>
     
    </div>
  </div>
</nav></>
  )
}
