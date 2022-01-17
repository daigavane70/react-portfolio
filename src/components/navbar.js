import React, { useState } from "react";

export default function Navbar() {

    const [showNav, setShowNav] = useState(false)

    function closeMobileNav() {
      setShowNav(false);
      }

      function toggleNav() {
        setShowNav(!showNav);
      }

      function closeMobileNavOnResize() {
        if (window.innerWidth > 700) {
          closeMobileNav();
        }
      }

      window.onresize = closeMobileNavOnResize;

  return (
    <div class="topbar"> 
      <div class="profile-pic">
        <img src="{ProfilePic}" alt="" />
      </div>
      <div onClick={toggleNav} class="nav-toggler">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className={`tabs ${showNav && 'mobile-tabs'}`}>
        <a onClick={closeMobileNav} href="#home" class="tab-button">
          Home
        </a>
        <a onClick={closeMobileNav} href="#experience" class="tab-button">
          Experience
        </a>
        <a onClick={closeMobileNav} href="#projects" class="tab-button">
          Projects
        </a>
        <a onClick={closeMobileNav} href="#skills" class="tab-button">
          Skills
        </a>
        <a onClick={closeMobileNav} href="#about" class="tab-button">
          About
        </a>
      </div>
    </div>
  );
}
