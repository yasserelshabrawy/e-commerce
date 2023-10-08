import React from 'react'
import DisplayProduct from '../DisplayProduct/DisplayProduct'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";
export default function Home() {
  return (<>
    <MainSlider></MainSlider>
    <CategorySlider></CategorySlider>
    <DisplayProduct></DisplayProduct>
            <Helmet>
                <meta charSet="utf-8" />
                <title>home page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    
  </>
  )
}
