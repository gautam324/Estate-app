import React, { useState, useEffect, useContext }from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import UserDetailContext from '../context/userDetailContext'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react';
import { createUser } from '../utils/api'

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0(); 
  const { userDetails, setUserDetails } = useContext(UserDetailContext);             
  const { mutate } = useMutation({                                       
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token)
  })
  useEffect(() => {  
    const getTokenAndRegister = async() => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email"
        }
      })
      localStorage.setItem("acces_token", res)                            
      setUserDetails((prev) => ({...prev, token:res}))                   
      mutate(res);                                                        
    }
    isAuthenticated && getTokenAndRegister()                               
  },[isAuthenticated])
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout;