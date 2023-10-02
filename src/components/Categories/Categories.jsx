import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
export default function CategorySlider() {
  function getPhoto() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("categorySlider", getPhoto);
  console.log(data?.data.data);

  return (
    <div className="container py-5">
      <div className="row py-3">
      
          {data?.data.data.map((category) => (
            <div key={category._id} className="col-md-4 text-center">
              <img  height={200} width={200} src={category.image} />
              <p className="text-main fw-bold pt-2">{category.name}</p>
            </div>
          ))}
 
      </div>
    </div>
  );
}

