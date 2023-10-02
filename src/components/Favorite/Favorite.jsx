import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext/CartContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Favorite() {
  let {displayFavorite, addToCart, setCartCount,countFav, setCountFav,favorite, setFavorite} = useContext(CartContext)
  


 async function getLogedFavorite(){
  let {data} = await displayFavorite()
  if(data?.status === 'success'){
  console.log(data.status);
  setFavorite(data)
  console.log(data.count);
  setCountFav(data.count)
  console.log(countFav);
 }}
 async function addProductCart(id){
  let response = await addToCart(id)
  console.log(response);
  console.log(response.data.status);
  if(response.data.status === 'success') {
   toast.success(response.data.message);
  }
  setCartCount(response.data.numOfCartItems)

}
 useEffect(() => {
   getLogedFavorite()
 }, [])
 
 console.log(favorite);
  return (
      <>
    {favorite? <div className="container py-5">
      <div className="row text-center my-5">
        {favorite.data.map((fav)=> 
        <div key={fav.id} className="product col-md-2">

  <Link to={`/ProductsDetails/${fav.id}`}>
  <img className='w-100' src={fav.imageCover} alt="" />
  <span className='font-sm text-main'>{fav.category.name}</span>
  <h3 className='h6'>{fav.title.split(" ").slice(0,2).join(" ")}</h3>
  <div className='d-flex justify-content-between'>
    <span>{fav.price}EGP</span>
    <span ><i className='fas fa-star rating-color'>{fav.ratingsAverage}</i></span>
  </div>
  </Link>
  <button onClick={()=>{addProductCart(fav.id)}} className='btn w-100 bg-main text-white my-2'>Add to Cart</button>
        </div>
   
       )}
        </div>
        </div>:'' }

        </>
  )
}
