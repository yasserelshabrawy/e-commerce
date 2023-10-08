import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
export default function CategorySlider() {
  function getPhoto() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("categorySlider", getPhoto);
  console.log(data?.data.data);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <div className="container CategorySlider">
          <div className="row py-3">
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            
              <img key={category._id} height={200} src={category.image} />

            
              ))}
        </Slider>
              </div>
    </div>
  );
}
