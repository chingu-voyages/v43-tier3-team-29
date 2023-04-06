import React, { useState } from "react";

// Icons
import {
  HiOutlineSun,
  HiOutlineMusicNote,
  HiMenu,
  HiOutlineX,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineMail,
} from "react-icons/hi";

// Nav list
const navList = [
  { title: "Home", icon: <HiOutlineHome /> },
  { title: "About", icon: <HiOutlineUsers /> },
  { title: "Portfolio", icon: <HiOutlineDesktopComputer /> },
  { title: "Contact", icon: <HiOutlineMail /> },
];

// Mobile Nav
import MobileNav from "./MobileNav";

const Navbar = () => {
  // Mobile navbar state
  const [isOpen, setIsOpen] = useState(false);

  // Hamburger icon click handler
  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="container">
        <nav className="navigation">
          {/* Sections navigation */}
          <ul>
            {navList.map((navItem, index) => (
              <li key={index}>
                <button>{navItem.title}</button>
              </li>
            ))}
          </ul>

          {/* Theme toggler & Sound Level Control */}
          <ul>
            <li>
              <button aria-label="theme toggler">
                <HiOutlineSun />
              </button>
            </li>
            <li>
              <button aria-label="sound level control">
                <HiOutlineMusicNote />
              </button>
            </li>
          </ul>

          {/* Mobile menu toggle button */}
          <button
            onClick={handleHamburgerClick}
            className="hamburger"
            aria-label="sound level control"
          >
            {isOpen ? <HiOutlineX /> : <HiMenu />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && <MobileNav navList={navList} />}
      </div>
    </header>
  );
};

export default Navbar;
