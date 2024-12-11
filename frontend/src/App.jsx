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

export default function App() {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Suspense fallback={<div>Loading data ...</div>}>
      
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
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
  )
}