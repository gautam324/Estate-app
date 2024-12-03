import React from 'react'
import Searchbar from '../components/Searchbar'
import { PROPERTIES } from '../constants/data'
import Item from "../components/Item";

const Listing = () => {
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div>
          <Searchbar />
          {/* container */}
          <div>
            {PROPERTIES.map((property) => (
                <Item key={property.title} property={property} />   
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Listing;