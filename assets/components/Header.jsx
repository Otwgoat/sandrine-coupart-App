import React, { useContext } from "react";
import authAPI from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <header>
      <h1>Header</h1>
      {(!isAuthenticated && <button>Connexion</button>) || (
        <button onClick={handleLogout}>Déconnexion</button>
      )}
    </header>
  );
};

export default Header;
