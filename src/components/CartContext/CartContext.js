import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

let header = {
  token: localStorage.getItem("userToken"),
};

function addToCart(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      { headers: header }
    )
    .then((response) => response)
    .catch((error) => error);
}
function getLoggedUserCart() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: header })
    .then((response) => response)
    .catch((error) => error);
}
function removeCart(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}
function updateCart(id, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      {
        headers: header,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}
function clearUserCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}
function addFavorite(productId) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: header,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}
function displayFavorite() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}
function deleteFav(productId) {

return axios
.delete(
  `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
  {
    headers: header,
  }
)
.then((response) => response)
.catch((error) => error);
}

export function CartContextProvider(props) {
  let [cartCount, setCartCount] = useState(0);
  let [cartId, setCartId] = useState(0);
  let [getOwner, setGetOwner] = useState("6505a72cb80e5611beca26cc");
  let [countFav, setCountFav] = useState(null);
  let [favorite, setFavorite] = useState(null)
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCart,
        updateCart,
        clearUserCart,
        cartCount,
        setCartCount,
        cartId,
        setCartId,
        getOwner,
        setGetOwner,
        addFavorite,
        displayFavorite,
        countFav,
        setCountFav,
        deleteFav,
        favorite,
         setFavorite
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
