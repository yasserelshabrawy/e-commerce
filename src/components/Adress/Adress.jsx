import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";

export default function Adress() {
    let {cartId} = useContext(CartContext)
  let header = {
      token: localStorage.getItem("userToken"),
    };
    
  function checkOut(id,value,url){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}` , {shippingAddress:value} , {
          headers:header
      })
    }
  async function hello(value) {
   let res = await checkOut(cartId, value,window.location.href.split("/").slice(0,3).join("/"))
   console.log(res.data);
    if(res.data.status === 'success'){
      window.location.href= res.data.session.url
  }

  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: hello,
  });

  return (
    <>
      <div className="container w-50 mx-auto mt-4 py-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            type="text"
            className="form-control "
            id="details"
            name="details"
          />

          <label htmlFor="phone">phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            className="form-control "
            id="phone"
            name="phone"
          />

          <label htmlFor="city">city :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            type="text"
            className="form-control "
            id="city"
            name="city"
          />
          <button type="submit" className="btn bg-main my-2"> Pay Now</button>

        </form>
      </div>
    </>
  );
}
