import React from 'react'
import Slider from "react-slick";
import ph1 from "../../Assets/images/slider-image-1.jpeg"
import ph2 from "../../Assets/images/slider-image-2.jpeg"
import ph3 from "../../Assets/images/slider-image-3.jpeg"
import ph4 from "../../Assets/images/blog-img-1.jpeg"
import ph5 from "../../Assets/images/blog-img-2.jpeg"
export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        
        autoplay:false,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className="container MainSlider">
        <div className="row gx-0 py-2">
            <div className="col-md-9">
            <Slider {...settings}>
                
               <img className='w-100' src={ph1} height={400} alt="" />
               <img className='w-100'src={ph2} height={400} alt="" />
               <img className='w-100' src={ph3} height={400} alt="" />
                
        </Slider>
            </div>
            <div className="col-md-3">
                <img height={200} className='w-100' src={ph4} alt="" />
                <img height={200} className='w-100' src={ph5} alt="" />
            </div>
        </div>
    </div>
  )
}
