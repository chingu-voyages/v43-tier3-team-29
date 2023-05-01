import React from "react";
import { AnimatePresence } from "framer-motion";

// Styles
import "./style.css";

// Icons
import {
  HiOutlineMusicNote,
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineCollection,
} from "react-icons/hi";

// Nav list
const navList = [
  { title: "about", icon: <HiOutlineBookOpen />, position: 0.7 },
  { title: "team", icon: <HiOutlineUsers />, position: 2.1 },
  { title: "stack", icon: <HiOutlineChip />, position: 6.7 },
  { title: "portfolio", icon: <HiOutlineDesktopComputer />, position: 7.8 },
  { title: "credits", icon: <HiOutlineCollection />, position: 9 },
];

// Mobile Nav
import MobileNav from "../MobileNav";

// Helpers
import changeCameraPosition from "../../../helpers/changeCameraPosition";

// Sound control
import SoundControl from "../SoundControl/";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/store";

const Navbar = () => {
  // Get store values/functions
  const [
    soundLevel,
    soundControlIsVisible,
    toggleSoundControlVisibility,
    updateCursorType,
    activeNav,
    updateActiveNav,
  ] = useStore(
    (store) => [
      store.soundLevel,
      store.soundControlIsVisible,
      store.toggleSoundControlVisibility,
      store.updateCursorType,
      store.activeNav,
      store.updateActiveNav,
    ],
    shallow
  );

  const handleNavBtnClick = (title, position) => {
    updateActiveNav(title);
    changeCameraPosition(position);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navigation">
          {/* Sections navigation */}
          <ul>
            {navList.map((navItem, index) => (
              <li key={`${index}-navLink`}>
                <button
                  className={`${activeNav === navItem.title && "active"}`}
                  onMouseEnter={() => updateCursorType("hover")}
                  onMouseLeave={() => updateCursorType("pointer")}
                  onClick={() =>
                    handleNavBtnClick(navItem.title, navItem.position)
                  }
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
              <button
                className={`sound_control ${soundLevel == 0 && "no-sound"}`}
                aria-label="sound level control"
                onMouseEnter={() => updateCursorType("hover")}
                onMouseLeave={() => updateCursorType("pointer")}
                onClick={() =>
                  toggleSoundControlVisibility(!soundControlIsVisible)
                }
              >
                <HiOutlineMusicNote />
              </button>
            </li>
          </ul>
          {/* Sound Control */}
          <AnimatePresence>
            {soundControlIsVisible && <SoundControl />}
          </AnimatePresence>
        </nav>

        {/* Mobile menu */}
        <MobileNav navList={navList} />
      </div>
    </header>
  );
};

export default Navbar;
