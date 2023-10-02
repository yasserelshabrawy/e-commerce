import React, { useContext } from 'react'
import { UserContext } from '../Context/Context'


export default function Profile() {
    let {userData} = useContext(UserContext)
    console.log(userData);
  return (
    <div><div className="container text-center w-50 mx-auto border-danger my-5 p-3 py-5 bg-main-light">
        <h3>Name : {userData.name}</h3>
        <h4>Email : {userData.email}</h4>
        </div>
        </div>
  )
}
