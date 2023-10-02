import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Code() {
    const navigate = useNavigate()
    
    async function getCode(value){
    
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
         value)
         console.log(data);
         console.log(data.status);
         console.log('hi');
         if(data.status === 'Success'){
            
            navigate('/reset')
         }
         console.log('hello');
    }
    let formik = useFormik({
        initialValues: {
          resetCode: "",
        },
        onSubmit: getCode,
      });
  return (
    <>
 <div className="container w-50 mx-auto mt-4">
    <h2>Enter Your Code </h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="code">write your code:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          type="text"
          id="code"
          className="form-control"
          name="resetCode"
        />
        <button type='submit' className='btn bg-main text-white my-2'>Send Code</button>
        </form>
        </div>
    </>
  )
}
