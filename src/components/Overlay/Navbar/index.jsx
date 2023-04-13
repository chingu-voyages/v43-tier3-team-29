import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

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
  // { title: "Home", icon: <HiOutlineHome /> },
  { title: "About", icon: <HiOutlineBookOpen /> },
  { title: "Team", icon: <HiOutlineUsers /> },
  { title: "Dialogue", icon: <HiOutlineChatAlt2 /> },
  { title: "Stack", icon: <HiOutlineChip /> },
  { title: "Portfolio", icon: <HiOutlineDesktopComputer /> },
  { title: "Credits", icon: <HiOutlineCollection /> },
];

// Mobile Nav
import MobileNav from "../MobileNav";

const Navbar = () => {
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
                <button>{navItem.title}</button>
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
