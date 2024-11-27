import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProperty from './pages/AddProperty'
import Listing from './pages/Listing'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/listing" element={<Listing />} />
        <Route path="/addproperty" element={<AddProperty />} />
      </Routes>
    </BrowserRouter>
  )
}