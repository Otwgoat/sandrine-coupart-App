import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Metadescription from "../components/Metadescription";
import { useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/Footer";

const AdminPage = () => {
  const navigate = useNavigate();
  const [startRedirect, setStartRedirect] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // === Logout === //
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
    <div className="container">
      <Metadescription />
      <Header title="Administration" />
      <main className="adminMain" id="adminPage">
        <div id="adminPageCTAs">
          <Button path="/admin/recettes" title="Gérer les recettes" />
          <Button path="/admin/utilisateurs" title="Gérer les utilisateurs" />
          <button
            className="ctaButton"
            id="logoutButton"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
