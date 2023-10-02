import axios from "axios";
import React from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useQuery } from "react-query";
export default function AllOrders() {
  let { getOwner } = useContext(CartContext);
  console.log(getOwner);
  async function getAllOrders(owner) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${owner}`
    );
  }

  let { data } = useQuery("cartOwner", () => getAllOrders(localStorage.getItem('owner')));
  console.log(data?.data);
  console.log(localStorage.getItem('owner'));
  return (
    <div className="w-50 mx-auto bg-main-light my-2 p-3">
      <h3 className="text-center">All Orders</h3>
      {data?.data.map((owner) => (
        <>
          <div className="row" key={owner.id}>
            <div className="col-md-12">
              {owner.cartItems.map((img) => (
                <div className="row bg-white my-2  align-items-center" key={img._id}>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className="col-md-4">
                    <img
                      src={img.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                    </div>
                    <div className="col-md-8 text-main">
                    <h6>Name: {img.product.title.split(" ").slice(0,2).join(" ")}</h6>
                    <h6>Count: {img.count}</h6>
                    <h6>Price: {img.price}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 text-center">
                    <h6 className="my-3">Is Deliverd : <span className="bg-danger text-white p-1 rounded ">{owner.isDeliverd?"yes":'NO'}</span></h6>
                    <h6>Is Paid : <span className="bg-success text-white p-1 rounded">{owner.isPaid?"yes":'NO'}</span></h6>
                    
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6 mx-auto border border-black">
              <h4 className="text-center ">Total Price : {owner.totalOrderPrice}</h4>
              <h4 className="text-center ">Pay Method : {owner.paymentMethodType}</h4>

            </div>
          </div>
        </>
      ))}
    </div>
  );
}
