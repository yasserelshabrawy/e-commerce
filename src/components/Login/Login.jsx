import React, { useContext, useState } from "react";
import {useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";


export default function Register() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setIsloading] = useState(false);
  let {setUserToken, setUserData}= useContext(UserContext)

  async function login(value) {
    setIsloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .catch((err) => {
        setError(err.response.data.message);
        setIsloading(false);
      });
    if (data.message === "success") {
      localStorage.setItem('userToken' , data.token)
      setUserToken(data.token)
      setUserData(data.user)
      navigate("/");
      console.log(data);
    }
  }


  let x = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: x,
    onSubmit: login,
  });
  return (
    <>
      <div className="container w-50 mx-auto mt-4">
        <form className="bg-main-light p-3" onSubmit={formik.handleSubmit}>
          <h2 className="text-center">Login</h2>
          {error !== null ? <p className="alert alert-danger">{error}</p> : ""}

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
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger p-2 mt-2">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            id="password"
            className="form-control"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}

           <p className="p-0 m-0"> <Link to='/forget'>Forget Passwort ?</Link></p>
          {isLoading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white mt-3"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white mt-3"
            >
              Register
            </button>
          )}
                      <button
              className="btn  mt-3 mx-2"
            >
              <Link className=" text-dark" to='/register'>Register Now</Link>
            </button>
        </form>
      </div>
    </>
  );
}
