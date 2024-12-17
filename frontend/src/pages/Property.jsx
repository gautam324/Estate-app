import React, { useState, useContext } from 'react';
import UserDetailContext from '../context/userDetailContext';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthCheck from '../hooks/useAuthCheck.js';
import { useQuery } from 'react-query';
import { getProperty, removeBooking } from '../utils/api';
import { useLocation } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import HeartBtn from '../components/HeartBtn';
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md';
import { CgRuler } from 'react-icons/cg';
import { FaLocationDot } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import BookingModal from '../components/BookingModal';
import { useMutation } from 'react-query';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import Item from '../components/Item';  // Import the Item component

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];

  const { data, isLoading, isError } = useQuery(
    ['resd', id],
    () => getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success('Booking cancelled', { position: 'bottom-right' });
    },
  });

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error while fetching data</div>;
  }

  return (
    <section className="max-padd-container my-[99px]">
      {/* Now you render the Item component, passing `data` as `property` */}
      <Item property={data} />  {/* This is where the data is passed to Item */}

      {/* container */}
      <div className="xl:flexBetween gap-8">
        {/* Left-side and Right-side sections */}
        <div className="flex-1">
          {/* Left-side content (like title, price, facilities, etc.) */}
          {/* More code related to layout and features */}
        </div>
        
        <div className="flex-1">
          {/* Right-side content (like Map, etc.) */}
          {/* More code related to layout and features */}
        </div>
      </div>
    </section>
  );
};

export default Property;
