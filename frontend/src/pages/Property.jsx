import React, { useState, useContext } from 'react'
import UserDetailContext from '../context/userDetailContext'
import { useAuth0 } from '@auth0/auth0-react'
import useAuthCheck from '../hooks/useAuthCheck.js'
import { useQuery } from 'react-query'
import { getProperty, removeBooking } from '../utils/api'
import { useLocation } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import HeartBtn from '../components/HeartBtn'
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from 'react-icons/md'
import { CgRuler } from 'react-icons/cg'
import { FaLocationDot } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Map from '../components/Map'
import useAuthCheck from '../hooks/useAuthCheck.js'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../components/BookingModal'
import { useMutation } from 'react-query'
import { Button } from '@mantine/core'

const Property = () => {
  const { pathname } = useLocation()
  const id = pathname.split("/").slice(-1)[0]
  const { data, isLoading, isError } = useQuery(
    ["resd", id],
    () => getProperty(id)
  )

  if (isError) {
    return (
      <div>
        <span>Error while fetchin data</span>
      </div>
    )
  }


  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()          
  const { user } = useAuth0()

  const {
    userDetails: {token, bookings},
    setUserDetails
  } = useContext( UserDetailContext)


   const { mutate: cancelBooking, isLoading:cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev)=> ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id)
      }))
      toast.success("Booking cancelled", {position: 'bottom-right'})
    }
  })

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
    )
  }
  return (
    <section className="max-padd-container my-[99px]">
      <div className="pb-2 relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-xl max-h-[27rem] self-center w-full object-cover"
        />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn />
        </div>
      </div>
      {/* container */}
      <div className="xl:flexBetween gap-8">
        
        {/* left-side */}
        <div className="flex-1">
          <h5 className="bold-16 my-1 text-secondary">{data?.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18 line-clamp-1">{data?.title}</h4>
            <div className="bold-20">
              ${data.price}.00
            </div>
          </div>
          {/* info */}
          <div className="flex gap-x-4 py-2">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed />{data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathtub />{data?.facilities.bathrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage />{data?.facilities.parkings}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <CgRuler /> 400
            </div>
          </div>
          <p className="pt-2 mb-4">
            {data.description}
          </p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {data?.address} {data?.city} {data?.country}
            </div>
          </div>
          <div className="flexBetween">   
          {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  onClick={() => cancelBooking()}
                  variant="outline"
                  w={"100%"}
                  color="red"
                  disabled={cancelling}
                >
                  Cancel booking
                </Button>
                <p>
                  You've already booked visit for {bookings?.filter((booking) => booking?.id === id)[0].date}
                </p>
              </>
            ) : (
              <button 
                className="btn-secondary rounded-xl !py-[7px] !px-4 shadow-sm w-full"
                onClick={() => {validateLogin() && setModalOpened(true)}}  
              >
                Book the visit
              </button>
            )
            }



            <BookingModal 
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>
        {/* rightSide */}
        <div className="flex-1">
          <Map 
            address={data?.address} 
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  )
}

export default Property;