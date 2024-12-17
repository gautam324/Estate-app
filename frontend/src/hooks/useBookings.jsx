import React, { useContext, useRef, useEffect } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAllFav, getAllBookings } from "../utils/api.js"
const useBookings = () => {
  
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0()
  const { data , isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails?.token),                  
    onSuccess: (data) => setUserDetails((prev) =>  ({ ...prev, bookings: data })), 
    enabled: user !== undefined,
    staleTime: 30000
  });
  queryRef.current = refetch; 
  useEffect(() => {                         
    queryRef.current && queryRef.current()  
  },[userDetails?.token])
  return (
    <div>useBookings</div>
  )
}
export default useBookings