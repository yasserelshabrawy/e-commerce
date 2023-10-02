import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
export default function Brands() {

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data , isLoading} = useQuery('displayBrand', getBrands)
  console.log(data?.data.data);
  console.log(isLoading);
  return (
  <>
    {isLoading? <div>
      <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
  </div>
    </div>:<>
    <div className="container">
      <div className="row">
        {data?.data.data.map((brand)=> <div key={brand._id} className='col-md-3'>
          <div className="brand m-2 cursor-pointer">
            <Link to={`/BrandsDetails/${brand._id}`}>
            <img className='w-100' src={brand.image} alt="" />
            <h4 className='text-center'>{brand.name}</h4>
            </Link>
          </div>
        </div>)}
        </div></div></>}
  </>
  )
}
