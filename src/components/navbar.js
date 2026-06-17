import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const prefix = isHome ? '' : '/';

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
        <a onClick={closeMobileNav} href={`${prefix}#home`} className="tab-button">
          Home
        </a>
        <a onClick={closeMobileNav} href={`${prefix}#experience`} className="tab-button">
          Experience
        </a>
        <a onClick={closeMobileNav} href={`${prefix}#projects`} className="tab-button">
          Projects
        </a>
        <a onClick={closeMobileNav} href={`${prefix}#blogs`} className="tab-button">
          Blogs
        </a>
        <a onClick={closeMobileNav} href={`${prefix}#skills`} className="tab-button">
          Skills
        </a>
        <a onClick={closeMobileNav} href={`${prefix}#about`} className="tab-button">
          About
        </a>
      </div>
    </div>
  );
}
