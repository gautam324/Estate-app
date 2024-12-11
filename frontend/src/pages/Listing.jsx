import React from 'react'
import Searchbar from '../components/Searchbar'
//import { PROPERTIES } from '../constants/data'
import Item from "../components/Item";
import useProperties from "../hooks/useProperties.jsx"
import { PuffLoader } from 'react-spinners'

const Listing = () => {
  const {data, isError, isLoading} = useProperties();
  if(isError){
    return(
      <div>
        <span>Error while fetchin data</span>
      </div>
    )
  }
  if(isLoading){
    return(
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    )
  }


  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div>
          <Searchbar />
          {/* container */}
          <div>
          {data.map((property) => (
                <Item key={property.title} property={property} />   
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Listing;