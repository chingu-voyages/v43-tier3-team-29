import React from "react";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";

// Icons
import { HiOutlineSun, HiOutlineMusicNote } from "react-icons/hi";

const MobileNav = ({ navList }) => {
  const handleClick = (position) => {
    if (position < cameraMovementSheet.sequence.position) {
      cameraMovementSheet.sequence.play({
        range: [position, cameraMovementSheet.sequence.position],
        rate: 0.3,
        direction: "reverse",
      });
    } else {
      cameraMovementSheet.sequence.play({
        range: [cameraMovementSheet.sequence.position, position],
        rate: 0.3,
      });
    }
  };

  return (
    <div className="mobile-nav-overlay">
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem, index) => (
            <li key={`${index}-mobileNavLink`}>
              <button
                onClick={() => handleClick(navItem.position)}
                aria-label={navItem.title}
              >
                {navItem.icon}
              </button>
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
