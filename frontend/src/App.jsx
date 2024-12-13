import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProperty from './pages/AddProperty'
import Listing from './pages/Listing'
import Favourites from './pages/Favourites'
import Bookings from './pages/Bookings'
import Footer from './components/Footer'
import Header from './components/Header'
import { Suspense } from 'react'
import Layout from './components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query' // v3
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { ReactQueryDevtools } from 'react-query/devtools' 
import Property from './pages/Property'
import React, { useState, useEffect, useContext } from 'react'; // Example for multiple hooks


import UserDetailContext from './context/userDetailContext'

export default function App() {

  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({ // El estado se pasa al context y en el layout se le da valor
    favourites: [],
    bookings: [],
    token: null,
  });
  
  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading data ...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing"  >
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/addproperty" element={<AddProperty />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/bookings" element={<Bookings />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  )
}