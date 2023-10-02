import { createContext, useState } from "react";

export let UserContext = createContext();
export function UserContextProvider(props){

    let [userToken, setUserToken] = useState(null)
    let [userData, setUserData] = useState(null)
 return <>
        <UserContext.Provider value={{userToken, setUserToken, setUserData, userData}}>
        {props.children}
         </UserContext.Provider>
 </>
}