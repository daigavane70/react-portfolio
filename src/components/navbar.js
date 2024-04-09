import React, { useState } from 'react';

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

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
    <div className="topbar">
      <div className="profile-pic">
        <img src="{ProfilePic}" alt="" />
      </div>
      <div onClick={toggleNav} className="nav-toggler">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className={`tabs ${showNav && 'mobile-tabs'}`}>
        <a onClick={closeMobileNav} href="#home" className="tab-button">
          Home
        </a>
        <a onClick={closeMobileNav} href="#experience" className="tab-button">
          Experience
        </a>
        <a onClick={closeMobileNav} href="#projects" className="tab-button">
          Projects
        </a>
        <a onClick={closeMobileNav} href="#blogs" className="tab-button">
          Blogs
        </a>
        <a onClick={closeMobileNav} href="#skills" className="tab-button">
          Skills
        </a>
        <a onClick={closeMobileNav} href="#about" className="tab-button">
          About
        </a>
      </div>
    </div>
  );
}
