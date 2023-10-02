import React, { useState } from 'react'
import {formik , useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'




export default function Register() {
  let navigate = useNavigate()
  let [error , setError] = useState(null)
  let [isLoading, setIsloading] = useState(false)
  
 async function register(value){
  setIsloading(true)
    let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
    .catch((err)=> {
      setError(err.response.data.message)
      setIsloading(false)
    })
    if (data.message === "success"){
      navigate('/login')
    }
  }
  
  let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  let validationSchema = yup.object({
    name:yup.string().min(3 , 'name minlength is 3').max(10,'name maxlength is 10' ).required('name is required'),
    email:yup.string().email('email is invalid').required('email is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref("password")], 'Passwors dont match').required('password is required'),
    phone:yup.string().matches(phoneRegex , 'phone is invalid').required('phone is required')
  })
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema,
    onSubmit: register
  })
  return (<>
    <div className='container w-50 mx-auto mt-4'>
    <form className='bg-main-light p-3' onSubmit={formik.handleSubmit} >
      <h2 className='text-center'>Register</h2>
      {error !== null ? <p className='alert alert-danger'>{error}</p> : ""}
      <label htmlFor="name">name:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id='name' className='form-control' name='name'  />
      {formik.errors.name && formik.touched.name?<p className='alert alert-danger p-2 mt-2'>{formik.errors.name}</p>:''}
     
      <label htmlFor="email">email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' className='form-control' name='email' />
      {formik.errors.email && formik.touched.email?<p className='alert alert-danger p-2 mt-2'>{formik.errors.email}</p>:''}
     
      <label htmlFor="password">password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' className='form-control' name='password' />
      {formik.errors.password && formik.touched.password?<p className='alert alert-danger p-2 mt-2'>{formik.errors.password}</p>:''}
     
      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='rePassword' className='form-control' name='rePassword' />
      {formik.errors.rePassword && formik.touched.rePassword?<p className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword}</p>:''}
      
      <label htmlFor="phone">phone:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="phone" id='phone' className='form-control' name='phone' />
      {formik.errors.phone && formik.touched.phone?<p className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</p>:''}

      {isLoading? <button  disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3'><i className='fas fa-spinner fa-spin'></i></button> :<button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3'>Register</button> }
      
     
    </form>
   </div>
  </>
  )
}
