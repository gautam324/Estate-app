import React from 'react'
import HeartBtn from './HeartBtn'
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Item = ({ property }) => {
  // Add a check to ensure 'property' exists
  if (!property) {
    return <div>Loading...</div>; // Or you can return a different fallback UI
  }

  return (
    <div className="rounded-2xl p-5 bg-white">
      <div className="pb-2 relative">
        {/* Check if 'property.image' exists before using it */}
        <img 
          src={property?.image || 'default-image.jpg'}  // Fallback image if 'image' is not available
          alt={property?.title || 'Property'}           // Fallback alt text if 'title' is not available
          className="rounded-xl"
        />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn />
        </div>
      </div>

      <h5 className="bold-16 my-1 text-secondary">{property?.city || 'Unknown City'}</h5>
      <h4 className="medium-18 line-clamp-1">{property?.title || 'Untitled Property'}</h4>
      {/* info */}
      <div className="flex gap-x-2 py-2">
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBed />{property?.facilities?.bedrooms || 0}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBathtub />{property?.facilities?.bathrooms || 0}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineGarage />{property?.facilities?.parkings || 0}
        </div>
      </div>
      <p className="pt-2 mb-4 line-clamp-2">
        {property?.description || 'No description available.'}
      </p>
      <div className="flexBetween">
        <div className="bold-20">
          ${property?.price || '0'}.00
        </div>
        <Link to={'/'}>
          <button className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Item;
