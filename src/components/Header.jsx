import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="hero__image">
      <div className="hero-text">
        <h1 className="hero__title-h1">Welcome to Coffee Connection!</h1>
        <p className="landing__here-sub">
          Find coffee shops around you easily
        </p>
        <Link to="/locations" className="search__link">
          Find a café
        </Link>
      </div>
    </header>
  );
};

export default Header;
