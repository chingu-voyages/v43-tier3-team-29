import React from "react";

// Icons
import { HiOutlineSun, HiOutlineMusicNote, HiMenu } from "react-icons/hi";

const MobileNav = ({ navList }) => {
  return (
    <div className="overlay">
      <nav className="mobileNav">
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
      </nav>
    </div>
  );
};

export default MobileNav;
