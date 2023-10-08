import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';

export default function ProductsDetails() {
    let params = useParams()
    let {addToCart, setCartCount} = useContext(CartContext)
    async function addProductCart(id){
        let response = await addToCart(id)
        console.log(response);
        console.log(response.data.status);
        if(response.data.status === 'success') {
         toast.success(response.data.message);
        }
        setCartCount(response.data.numOfCartItems)
 
    } 
    console.log(params);
    function getProductsDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    let {data} = useQuery('ProductsDetails', ()=>getProductsDetails(params.id))
    console.log(data?.data.data);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    
  return (
    <>
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-4">
            <Slider {...settings} className='MainSlider'>
        {data?.data.data.images.map((img)=> <img key={data?.data.data.id} className='w-100' src={img} alt={data?.data.data.title} />)}
            </Slider>
            <Slider {...settings} className='productSlider'>
         <img  className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
            </Slider>
            </div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            
            <div className="col-md-8">
                <h2 className='h5'>{data?.data.data.title}</h2>
                <p >{data?.data.data.description}</p>
                <h6 className='text-main' >{data?.data.data.category.name}</h6>
                <div className='d-flex justify-content-between'>
                    <span>{data?.data.data.price}EGP</span>
                    <span><i className='fas fa-star rating-color'> </i>{data?.data.data.ratingsAverage}</span>
                </div>
                <button onClick={()=>{addProductCart(data?.data.data.id)}} className='btn w-100 bg-main text-white my-2'>Add to Cart</button>
            </div>
        </div>
    </div>
    </>
    
  )
}

