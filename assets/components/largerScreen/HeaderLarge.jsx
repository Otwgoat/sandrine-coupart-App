import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";

const HeaderLarge = ({ title, pathname, isAuthenticated, handleLogout }) => {
  return (
    <>
      <div className="pageTitle">
        <h1>{title}</h1>
      </div>
      <nav className="navMenuLarge">
        <NavLink
          to="/"
          className={pathname === "/" ? "menuLinkLargeActive" : "menuLinkLarge"}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/recettes"
          className={
            pathname === "/recettes" ? "menuLinkLargeActive" : "menuLinkLarge"
          }
        >
          Mes recettes
        </NavLink>
        <NavLink
          to="/contact"
          className={
            pathname === "/contact" ? "menuLinkLargeActive" : "menuLinkLarge"
          }
        >
          Contact
        </NavLink>
      </nav>
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
    </>
  );
};

export default HeaderLarge;
