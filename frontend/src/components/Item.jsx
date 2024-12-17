import React from 'react';
import HeartBtn from './HeartBtn';
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md';
import { CgRuler } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const Item = ({ property }) => {
  const navigate = useNavigate();

  // Ensure that property is being passed correctly
  if (!property) {
    return <div>Loading...</div>;
  }

  const { image, title, city, facilities, size, description, price, id } = property;
  
  return (
    <div
      className="rounded-2xl p-5 bg-white"
      onClick={() => navigate(`/listing/${id}`)} // Using navigate for onClick
      role="button" // Accessibility improvement for the clickable div
      aria-label={`View details of ${title}`} // Adding accessibility to the clickable div
    >
      <div className="pb-2 relative">
        <img 
          src={image} 
          alt={title || 'Property Image'} // Ensuring alt text is available
          className="rounded-xl"
        />
        {/* like button */}
        <div className="absolute top-4 right-6">
          <HeartBtn id={id} />
        </div>
      </div>

      <h5 className="bold-16 my-1 text-secondary">{city}</h5>
      <h4 className="medium-18 line-clamp-1">{title}</h4>

      {/* info */}
      <div className="flex gap-x-2 py-2">
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBed />{facilities?.bedrooms ?? 'N/A'}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBathtub />{facilities?.bathrooms ?? 'N/A'}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineGarage />{facilities?.parkings ?? 'N/A'}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <CgRuler />{size ?? 'N/A'}
        </div>
      </div>

      <p className="pt-2 mb-4 line-clamp-2">
        {description || 'No description available'} {/* Fallback for missing description */}
      </p>

      <div className="flexBetween">
        <div className="bold-20">
          ${price}.00
        </div>
        <button
          className="btn-secondary rounded-xl !py-[7px] !px-4 shadow-sm"
          onClick={() => navigate(`/listing/${id}`)} // Navigate on button click
          aria-label={`View details of ${title}`} // Accessibility improvement for the button
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Item;
