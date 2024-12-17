import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdHomeWork, MdPermContactCalendar, MdAddHome } from 'react-icons/md'
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import AddPropertyModal from "./AddPropertyModal"
import useAuthCheck from '../hooks/useAuthCheck.js'

const Navbar = ({ containerStyles }) => {

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const handleAddPropertyClick = () => {
    if (validateLogin) {
      setModalOpened(true);
    }
  };

  return (
    <nav className={`${containerStyles}`}>
      {/* Home link */}
      <NavLink
        to='/'
        className={({ isActive }) => isActive ? 'active-link flexCenter gap-x-1 rounded-full px-2 py-1' : 'flexCenter gap-x-1 rounded-full px-2 py-1'}
      >
        <MdHomeWork />
        <div>Home</div>
      </NavLink>
      
      {/* Listing link */}
      <NavLink
        to='/listing'
        className={({ isActive }) => isActive ? 'active-link flexCenter gap-x-1 rounded-full px-2 py-1' : 'flexCenter gap-x-1 rounded-full px-2 py-1'}
      >
        <RiCheckboxMultipleBlankFill />
        <div>Listing</div>
      </NavLink>
      
      {/* Contact link */}
      <NavLink
        to='mailto:tedbrownlee8@gmail.com'
        className={'flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer'}
      >
        <MdPermContactCalendar />
        <div>Contact</div>
      </NavLink>



      {/* Add Property button */}
      <div
        onClick={handleAddPropertyClick}
        className={'flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer'}
      >
        <MdAddHome />
        <div>Add property</div>
      </div>

      {/* Add Property Modal */}
      <AddPropertyModal 
        opened={modalOpened}
        setOpened={setModalOpened}
      />
    </nav>
  );
};

export default Navbar;
