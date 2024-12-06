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
import { ReactQueryDevtools } from 'react-query/devtools' // No es necesario instalar nada con la v3





export default function App() {
    const queryClient = new QueryClient();
  return (
    <BrowserRouter>

    <Suspense fallback={<div>Loading data ...</div>}>
      
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/listing" element={<Listing />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/bookings" element={<Bookings />} />
          </Route>
        </Routes>
            
    </Suspense>
    </BrowserRouter>
  )
}