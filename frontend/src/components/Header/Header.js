import "./Header.css";
import BurgerMenu from './BurgerMenu'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavBar from "../NavBar/NavBar";
import RecipeSearch from "../SearchBar/Search";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";

const Header = ({ openLoginModal, openSignupModal, viewport}) => {
  const location = useLocation();
  const history = useHistory();
  const show = location.pathname !== "/explore" && location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/login";
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
   
  function handleBurgerClick(e) {
    e.preventDefault();
    setBurgerMenuOpen(!burgerMenuOpen)
  }
  if (viewport === "Desktop") {
    return (
      <div className="header-container">
        <div onClick={() => history.push("/")} className="logo">
          <h1>grubGlobe</h1>
        </div>
        {show && <RecipeSearch />}
        <NavBar
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
        />
      </div>
    );
  }

  if (viewport === "Mobile") {
    return (
        <div className="header-container">
          <div onClick={() => history.push("/")} className="logo">
            <h1>grubGlobe</h1>
          </div>
          <div className="mobile-burger-menu">
            <GiHamburgerMenu onClick={handleBurgerClick}/>
          </div>
          {burgerMenuOpen && (
            <BurgerMenu openLoginModal={openLoginModal} openSignupModal={openSignupModal}/>
          )}
        </div>
    );
  }

};

export default Header;
