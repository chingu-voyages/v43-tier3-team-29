import React from "react";
import { motion } from "framer-motion";

// Styles
import "./style.css";

// Icons
import { HiOutlineSun, HiOutlineMusicNote } from "react-icons/hi";

const MobileNav = ({ navList }) => {
  return (
    <motion.div
      initial={{ y: 72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 72, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mobile-nav-overlay"
    >
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem, index) => (
            <li key={`${index}-mobileNavLink`}>
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
    </motion.div>
  );
};

export default MobileNav;
