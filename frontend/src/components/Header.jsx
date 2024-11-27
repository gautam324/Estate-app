import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='max-padd-container fixed top-1 w-full left-0 right-0 z-50'>
      {/* container */}
      <div className='max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-1 ring-slate-900/5'>
        <div className='flexBetween py-3'>
          {/* logo */}
          <Link to={'/'}>
            <span className='font-[900] text-[24px]'>Casa<span className='font-[600] medium-20'>Central</span></span>
          </Link>
          {/* navbar */}
          <div className='flexCenter gap-x-4'>
            {/* desktop */}
            <Navbar containerStyles={'hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15'}/>
            {/* mobile */}
            {/* <Navbar /> */}
          </div>
          {/* buttons */}
          <div>
            buttons & icons
          </div>
        </div>
      </div>
    </header>
  )

}