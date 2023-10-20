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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
import { useMediaQuery } from "react-responsive";
import HeaderLarge from "./largerScreen/HeaderLarge";

const Header = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const toggleMenu = () => setIsOpen(!isOpen);
  const [startRedirect, setStartRedirect] = useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 400px)",
  });

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
    <header className={isDesktop ? "headerLarge" : ""}>
      {!isDesktop ? (
        <>
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
            <div className="menuBody">
              <NavLink
                to="/"
                className={pathname === "/" ? "menuLinkActive" : "menuLink"}
              >
                Accueil
              </NavLink>
              <NavLink
                to="/recettes"
                className={
                  pathname === "/recettes" ? "menuLinkActive" : "menuLink"
                }
              >
                Mes recettes
              </NavLink>
              <NavLink
                to="/contact"
                className={
                  pathname === "/contact" ? "menuLinkActive" : "menuLink"
                }
              >
                Contact
              </NavLink>
            </div>
            <div className="menuAuth">
              {(!isAuthenticated && (
                <Button id="loginButton" path="/login" title="Se connecter" />
              )) || (
                <Button
                  id="logoutButton"
                  title="Déconnexion"
                  onClick={handleLogout}
                />
              )}
            </div>
            <div className="menuIcons">
              <a href="#" className="menuIcon">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ color: "#ffffff" }}
                />
              </a>
              <a href="#" className="menuIcon">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "#ffffff" }}
                />
              </a>
              <a href="#" className="menuIcon">
                <FontAwesomeIcon
                  icon={faGooglePlusG}
                  style={{ color: "#ffffff" }}
                />
              </a>
            </div>
          </nav>
        </>
      ) : (
        <HeaderLarge
          title={props.title}
          pathname={pathname}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
