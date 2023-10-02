import React, { useContext, useEffect } from 'react'
import { CartContext } from '../CartContext/CartContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
  let {getLoggedUserCart, removeCart , updateCart, clearUserCart, setCartCount, setCartId, setGetOwner,getOwner,} = useContext(CartContext)
  let [cartProduct, setCartProduct] = useState(null)
  
  async  function displayCart()
  {
    let {data} = await getLoggedUserCart()
    console.log(data);
    if(data?.status === 'success'){
      setCartProduct(data)
      console.log(data);
      setCartCount(data?.numOfCartItems)
      console.log(data?.data.cartOwner);
      setGetOwner(data?.data.cartOwner)
      setCartId(data?.data._id);
      
    }
    
    
  }
  console.log(getOwner);
  localStorage.setItem('owner',(getOwner));
  
  console.log(localStorage.getItem('owner'));
  async function getRemoveCart(id){
    let {data} = await removeCart(id)
    if(data?.status === 'success'){
    console.log(data);
    setCartProduct(data)
    setCartCount(data.numOfCartItems)
    }
  }
  async function getUpdateCart(id , count){
    let {data} = await updateCart(id , count)
    if(data?.status === 'success'){
    console.log(data);
    setCartProduct(data)
    setCartCount(data.numOfCartItems)
    }

  }
  async function clearCart(){
    let {data} =  await clearUserCart()
    if(data?.status === 'success'){
    setCartProduct(null)
    setCartCount(data.numOfCartItems)
    }
  }
    useEffect(()=>{
      displayCart()
  
    }, [])
  return (<>
    {cartProduct? <div className="container">
            <div className="w-75 mx-auto p-3 bg-main-light my-3">
            <h3>Shop Cart :</h3>
          <h4 className='h6 text-main'>Cart Items : {cartProduct.numOfCartItems}</h4>
          <h4 className='h6 text-main'>total Cart Price : {cartProduct.data.totalCartPrice}EGP</h4>
          {cartProduct.data.products.map((product) =>
            <div key={product.product.id} className="row border-bottom p-2">
              <div className="col-md-1">
                  <img className='w-100' src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                <div>
                <h3 className='h6'>{product.product.title.split(" ").slice(0,3).join(" ")}</h3>
                  <h6 className='text-main'>Price : {product.price}</h6>
                  <button onClick={()=> getRemoveCart(product.product.id)} className='btn p-0' ><i className="fa-solid fa-trash-can font-sm text-danger"></i> remove</button>
                </div>
                <div>
                  <button onClick={()=> getUpdateCart(product.product.id , product.count+1)} className='btn bg-main p-1 text-white'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=>{product.count <= 1 ? getRemoveCart(product.product.id) : getUpdateCart(product.product.id , product.count-1) } } className='btn bg-main p-1 text-white'>-</button>
                </div>

                </div>
              </div>
            </div>
          )}
          <div className="d-flex">
          <button onClick={()=> clearCart()} className='bg-main btn text-white my-2 ms-auto'>Clear Cart</button>
          </div>
          <Link to={'/adress'} className='bg-main btn text-white'> Online Payment</Link>
          
            </div>
       </div>
       :''}
       </>
  )
}
