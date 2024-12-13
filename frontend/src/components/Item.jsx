import React from 'react'
import HeartBtn from './HeartBtn'
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { CgRuler } from 'react-icons/cg'

const Item = ({ property }) => {
  const navigate = useNavigate()

  // Ensure property and necessary fields are defined
  if (!property) return <div>Loading...</div> // Fallback UI if property is not available

  const {
    id,
    image,
    title,
    city,
    facilities = { bedrooms: 0, bathrooms: 0, parkings: 0 },
    description,
    price,
  } = property;

  return (
    <div 
      className="rounded-2xl p-5 bg-white" 
      onClick={() => navigate(`../listing/${id}`)}
    >

      <div className="pb-2 relative">
        <img 
          src={image} 
          alt={title} 
          className="rounded-xl"
        />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn />
        </div>
      </div>

      <h5 className="bold-16 my-1 text-secondary">{city}</h5>
      <h4 className="medium-18 line-clamp-1">{title}</h4>

      {/* info */}
      <div className="flex gap-x-2 py-2">
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBed />{facilities.bedrooms}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBathtub />{facilities.bathrooms}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineGarage />{facilities.parkings}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <CgRuler /> 400
        </div>
      </div>

      <p className="pt-2 mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flexBetween">
        <div className="bold-20">
          ${price}.00
        </div>
        <Link to={`/listing/${id}`}>
          <button className="btn-secondary rounded-xl !py-[7px] !px-4 shadow-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Item;
