import React, { useContext, useEffect, useState } from "react";
import authAPI from "../services/authAPI";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Header = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const toggleMenu = () => setIsOpen(!isOpen);
  const [startRedirect, setStartRedirect] = useState(false);

  // === HANDLE LOGOUT ===
  const handleLogout = () => {
    authAPI.logout();
    console.log("Déconnexion");
    setIsAuthenticated(false);
    console.log("Vous êtes déconnecté");
    setStartRedirect(true);
  };
  useEffect(() => {
    if (startRedirect === true) {
      navigate("/login");
    }
  }, [startRedirect]);
  // === JSX RETURN ===
  return (
    <header>
      <div className="pageTitle">
        <h1>{props.title}</h1>
      </div>

      {/*Displaying menu */}
      <div className="hamburgerMenu" /*onClick={toggleHamburgerMenu}*/>
        <div
          id="hamburgerBars"
          className={isOpen ? "hamburgerBarsActive" : "hamburgerBars"}
          onClick={toggleMenu}
        >
          <span
            id="bar1"
            className={isOpen ? "toggleBarActive" : "toggleBar"}
          ></span>
          <span
            id="bar2"
            className={isOpen ? "toggleBarActive" : "toggleBar"}
          ></span>
          <span
            id="bar3"
            className={isOpen ? "toggleBarActive" : "toggleBar"}
          ></span>
        </div>
      </div>
      <nav className={isOpen ? "navMenuActive" : "navMenu"}>
        <div className="menuHeader">
          {(!isAuthenticated && (
            <Link to="/login" className="menuLink">
              Se connecter
            </Link>
          )) || (
            <Link className="menuLink" onClick={handleLogout}>
              Déconnexion
            </Link>
          )}
        </div>
        <div className="menuBody">
          <NavLink
            to="/"
            className={pathname === "/" ? "menuLinkActive" : "menuLink"}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/recettes"
            className={pathname === "/recettes" ? "menuLinkActive" : "menuLink"}
          >
            Mes recettes
          </NavLink>
          <a href="#" className="menuLink">
            Contact
          </a>
        </div>
        {/** TODO: === ADD SOCIAL MEDIA ICONS=== */}
        <div className="menuFooter">
          <a href="#" className="menuIcon">
            Fb
          </a>
          <a href="#" className="menuIcon">
            Ig
          </a>
          <a href="#" className="menuIcon">
            Gl
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
