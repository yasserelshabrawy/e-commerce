
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { CartContext } from '../CartContext/CartContext';
import { toast } from 'react-hot-toast';

export default function DisplayProduct() {
  let { addToCart, setCartCount, addFavorite, displayFavorite, setCountFav, countFav, deleteFav, setFavorite } = useContext(CartContext);

  const [showHeart, setShowHeart] = useState([]); // State to track heart/broken heart icon

  useEffect(() => {
    // Initialize the array with 'true' values for all products initially
    if (data?.data.data) {
      setShowHeart(new Array(data.data.data.length).fill(true));
    }
  }, []);

  useEffect(() => {
    // Retrieve favorites from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setShowHeart(savedFavorites);
  }, []);

  async function gett(id, index) {
    let response = await addFavorite(id);
    console.log(response);
    if (response.data.status === 'success') {
      toast.success(response.data.message);
      getLogedFavorite();
      // Toggle the state for the clicked product
      const updatedShowHeart = [...showHeart];
      updatedShowHeart[index] = !updatedShowHeart[index];
      setShowHeart(updatedShowHeart);

      // Save the updated favorites state to local storage
      localStorage.setItem('favorites', JSON.stringify(updatedShowHeart));
    }
  }

  async function addProductCart(id) {
    let response = await addToCart(id);
    console.log(response);
    console.log(response.data.status);
    if (response.data.status === 'success') {
      toast.success(response.data.message);
    }
    setCartCount(response.data.numOfCartItems);
  }

  async function getLogedFavorite() {
    let { data } = await displayFavorite();
    if (data?.status === 'success') {
      console.log(data.status);
      setCountFav(data.count);
      console.log(countFav);
    }
  }

  async function getRemoveFav(id, index) {
    let response = await deleteFav(id);
    if (response.data.status === 'success') {
      toast.success(response.data.message);
      console.log(response);
      getLogedFavorite();

      // Toggle the state for the clicked product
      const updatedShowHeart = [...showHeart];
      updatedShowHeart[index] = !updatedShowHeart[index];
      setShowHeart(updatedShowHeart);

      // Save the updated favorites state to local storage
      localStorage.setItem('favorites', JSON.stringify(updatedShowHeart));
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery('displayProducts', getProducts);
  console.log(data?.data.data);

  return (
    <>
      {isLoading ? (
        <>
          <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
            <ColorRing
              visible={true}
              height='80'
              width='80'
              ariaLabel='blocks-loading'
              wrapperStyle={{}}
              wrapperClass='blocks-wrapper'
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        </>
      ) : (
        <>
          <div className='container py-5'>
            <div className='row my-5'>
              {data?.data.data.map((product, index) => (
                <div key={product.id} className='col-md-2'>
                  <div className='product p-2 position-relative'>
                    {showHeart[index] ? (
                      <button onClick={() => getRemoveFav(product.id, index)} className='favorite bg-danger text-white position-absolute end-0 btn'>
                        <i className='fas fa-heart-broken'></i>
                      </button>
                    ) : (
                      <button onClick={() => gett(product.id, index)} className='favorite bg-main text-white position-absolute end-0 btn'>
                        <i className='fas fa-heart'></i>
                      </button>
                    )}
                    <Link to={`/ProductsDetails/${product.id}`}>
                      <img className='w-100' src={product.imageCover} alt='' />
                      <span className='font-sm text-main'>{product.category.name}</span>
                      <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                      <div className='d-flex justify-content-between'>
                        <span>{product.price}EGP</span>
                        <span>
                          <i className='fas fa-star rating-color'>{product.ratingsAverage}</i>
                        </span>
                      </div>
                    </Link>
                    <button onClick={() => addProductCart(product.id)} className='btn w-100 bg-main text-white my-2'>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
