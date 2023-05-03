import React from "react";

// Styles
import "./style.css";

// Icons
import { HiOutlineSun, HiOutlineMusicNote } from "react-icons/hi";

// Helpers
import changeCameraPosition from "../../../helpers/changeCameraPosition";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/store";

const MobileNav = ({ navList }) => {
  // Get store values/functions
  const [
    soundLevel,
    soundControlIsVisible,
    toggleSoundControlVisibility,
    activeNav,
    updateActiveNav,
  ] = useStore(
    (store) => [
      store.soundLevel,
      store.soundControlIsVisible,
      store.toggleSoundControlVisibility,
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
    <div className="mobile-nav-overlay">
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem, index) => (
            <li key={`${index}-mobileNavLink`}>
              <button
                className={`${activeNav === navItem.title && "active"}`}
                onClick={() =>
                  handleNavBtnClick(navItem.title, navItem.position)
                }
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
            <button
              className={`sound_control ${soundLevel == 0 && "no-sound"}`}
              aria-label="sound level control"
              onClick={() =>
                toggleSoundControlVisibility(!soundControlIsVisible)
              }
            >
              <HiOutlineMusicNote />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
