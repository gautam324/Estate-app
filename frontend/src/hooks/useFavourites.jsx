import React, { useContext, useRef, useEffect } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAllFav } from "../utils/api.js"
const useFavourites = () => {
  
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0()
  const { data , isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email, userDetails?.token),                          
    onSuccess: (data) => setUserDetails((prev) =>  ({ ...prev, favourites: data })),  
    enabled: user !== undefined,
    staleTime: 30000
  });
  queryRef.current = refetch; 
  useEffect(() => {                         
    queryRef.current && queryRef.current() 
  },[userDetails?.token])
  return (
    <div>useFAvourites</div>
  )
}
export default useFavourites