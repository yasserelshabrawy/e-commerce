import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ColorRing } from 'react-loader-spinner';

export default function BrandsDetails() {
    let params = useParams()
    console.log(params);
    async function brandsDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    }
    let {data , isLoading}= useQuery('BrandsDetails' , ()=> brandsDetails(params.id))
    console.log(data?.data.data);

  return  <>
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
    </div>
  : <div>
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-7">
                <img className='w-100' src={data?.data.data.image} alt="" />
            </div>
            <div className="col-md-5">
                <h2>{data?.data.data.name}</h2>
                <h4>{data?.data.data.createdAt}</h4>
            </div>
        </div>
        </div></div>}
    </>
  
}
