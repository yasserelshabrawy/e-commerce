import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
export default function Forget() {
    const navigate = useNavigate()
    async function foregtPassword(value){
    
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
         value)
         console.log(data);
         console.log('hi');
         if(data.statusMsg === 'success'){
            navigate('/code')
         }
    }

    
    let formik = useFormik({
        initialValues: {
          email: "",
        },
        onSubmit: foregtPassword,
      });
  return (
  <>
    <div className="container w-50 mx-auto mt-4">
      <form className='bg-main-light p-3' onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          id="email"
          className="form-control"
          name="email"
        />
        <button type='submit' className='btn bg-main text-white my-2'>Send Code</button>
        </form>
        </div>
        </>
  )
}
