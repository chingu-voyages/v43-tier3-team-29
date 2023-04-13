import React from "react";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";

// Icons
import {
  HiOutlineSun,
  HiOutlineMusicNote,
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineCollection,
  HiOutlineChatAlt2,
} from "react-icons/hi";

// Nav list
const navList = [
  { title: "About", icon: <HiOutlineBookOpen />, position: 1.6 },
  { title: "Team", icon: <HiOutlineUsers />, position: 1.6 },
  { title: "Dialogue", icon: <HiOutlineChatAlt2 />, position: 2 },
  { title: "Stack", icon: <HiOutlineChip />, position: 6.7 },
  { title: "Portfolio", icon: <HiOutlineDesktopComputer />, position: 7.8 },
  { title: "Credits", icon: <HiOutlineCollection />, position: 9 },
];

// Mobile Nav
import MobileNav from "../MobileNav";

const Navbar = ({ setIsTeamSection }) => {
  // Handle click
  const handleClick = (btnTitle, position) => {
    console.log(cameraMovementSheet.sequence.position);
    console.log("clicking");

    if (btnTitle === "Team") {
      setIsTeamSection(true);
    }

    if (btnTitle === "About") {
      setIsTeamSection(false);
    }

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
    <header>
      <div className="container">
        <nav className="navigation">
          {/* Sections navigation */}
          <ul>
            {navList.map((navItem, index) => (
              <li
                key={`${index}-navLink`}
                className={`${
                  navItem.title === "Dialogue" && "navigation-dialogue"
                }`}
              >
                <button
                  onClick={() => handleClick(navItem.title, navItem.position)}
                >
                  {navItem.title}
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

        {/* Mobile menu */}
        <MobileNav navList={navList} />
      </div>
    </header>
  );
};

export default Navbar;
