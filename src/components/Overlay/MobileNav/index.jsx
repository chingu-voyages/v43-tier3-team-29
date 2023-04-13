import React from "react";

// Styles
import "./style.css";

// Icons
import { HiOutlineSun, HiOutlineMusicNote } from "react-icons/hi";

const MobileNav = ({ navList }) => {
  return (
    <div className="mobile-nav-overlay">
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem, index) => (
            <li key={`${index}-mobileNavLink`}>
              <button aria-label={navItem.title}>{navItem.icon}</button>
            </li>
          ))}
        </ul>

        {/* Theme toggler & Sound Level Control */}
        <ul>
          {/* <li>
            <button aria-label="theme toggler">
              <HiOutlineSun />
            </button>
          </li> */}
          <li>
            <button aria-label="sound level control">
              <HiOutlineMusicNote />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
