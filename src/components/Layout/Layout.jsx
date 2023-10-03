import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../Context/Context'
import { Offline, Online } from "react-detect-offline";
import  { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';

export default function Layout() {
  let {setUserToken} = useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null)
    {
      setUserToken(localStorage.getItem("userToken"))
    }
  },[])
  return (<>
 <div className='d-grid vh-100'>
 <Navbar/>
 <div className='my-5'>

    <Outlet></Outlet>
 </div>
    <Offline>Site is offline</Offline>
    <Toaster></Toaster>
    <Footer></Footer>
 </div>
    
  </>
  )
}
