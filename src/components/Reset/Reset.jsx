import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { UserContext } from '../Context/Context';

export default function Code() {
    let navigate = useNavigate()
    let {setUserToken} =useContext(UserContext)
    async function changePassword(value){
    
        let data = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
         value)
         .catch((err)=> {console.log(err)})
         console.log(data);
         if(data.status === 200){
          localStorage.setItem('userToken' , data.token)
          setUserToken(data.token)
              navigate('/login')
         }
    }
    let x = yup.object({
        newPassword: yup
          .string()
          .matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
          .required("password is required"),
      });
    let formik = useFormik({
        initialValues: {
          email: "",
          newPassword:""
        },
       validationSchema: x,
        onSubmit: changePassword
      });
  return (
    <>
 <div className="container w-50 mx-auto mt-4">
      <form className='bg-main-light p-3' onSubmit={formik.handleSubmit}>
        <h2 className='text-center'>Reset Password</h2>
        <label htmlFor="email">Email:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="text"
          id="email"
          className="form-control"
          name="email"
        />
        <label htmlFor="rePassword">rePassword:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          type="password"
          id="rePassword"
          className="form-control"
          name="newPassword"
        />
        
        {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className="alert alert-danger p-2 mt-2">
              {formik.errors.newPassword}
            </p>
          ) : (
            ""
          )}
        <button type='submit' className='btn bg-main text-white my-2'>Done</button>
        </form>
        </div>
    </>
  )
}