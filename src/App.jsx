import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Register from "./components/Register/Register.jsx";
import Products from "./components/Products/Products.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Adress from "./components/Adress/Adress.jsx";
import Protect from "./components/Protect/Protect";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import BrandsDetails from "./components/BrandsDetails/BrandsDetails";
import AllOrders from "./components/AllOrders/AllOrders";
import Forget from "./components/Forget/Forget";
import Code from "./components/Code/Code";
import Reset from "./components/Reset/Reset";
import Favorite from "./components/Favorite/Favorite";



function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Protect><Home /></Protect> },
        { path: "Brands", element: <Protect><Brands /></Protect> },
        { path: "Categories", element: <Protect><Categories /></Protect> },
        { path: "Products", element: <Protect><Products /></Protect>},
        { path: "Cart", element: <Protect><Cart /></Protect> },
        { path: "Adress", element: <Protect><Adress /></Protect> },
        { path: "Profile", element: <Protect><Profile /></Protect> },
        { path: "AllOrders", element: <Protect><AllOrders /></Protect> },
        { path: "Favorite", element: <Protect><Favorite /></Protect> },
        { path: "ProductsDetails/:id", element: <ProductsDetails /> },
        { path: "BrandsDetails/:id", element: <BrandsDetails /> },
        { path: "Login", element: <Login /> },
        { path: "Forget", element: <Forget /> },
        { path: "Code", element: <Code /> },
        { path: "Reset", element: <Reset /> },
        { path: "Logout", element: <Logout /> },
        { path: "Register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>
  
  ;
}

export default App;
