import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footerContainer">
      <div id="socialContainer">
        <a href="#" className="menuIcon">
          <FontAwesomeIcon
            className="icon"
            icon={faFacebookF}
            style={{ color: "#68B0AB" }}
          />
        </a>
        <a href="#" className="menuIcon">
          <FontAwesomeIcon
            className="icon"
            icon={faInstagram}
            style={{ color: "#68B0AB" }}
          />
        </a>
        <a href="#" className="menuIcon">
          <FontAwesomeIcon
            className="icon"
            icon={faGooglePlusG}
            style={{ color: "#68B0AB" }}
          />
        </a>
      </div>
      <div id="cgvs">
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/politique-confidentialite">
          Politique de confidentialité
        </Link>
        <p>Lucas Jouffroy 2023</p>
      </div>
    </div>
  );
};

export default Footer;
