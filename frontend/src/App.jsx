import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Favourites from './pages/Favourites';
import Bookings from './pages/Bookings';
import Footer from './components/Footer';
import Header from './components/Header';
import { Suspense } from 'react';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from 'react-query/devtools'; 
import Property from './pages/Property';
import UserDetailContext from './context/userDetailContext';
import Contact from './pages/Contact';  // Ensure this is imported

export default function App() {

  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading data ...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing" >
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}
