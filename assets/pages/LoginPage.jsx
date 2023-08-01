import React, { useContext, useEffect, useState } from "react";
import authAPI from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Header from "../components/Header";
import Metadescription from "../components/Metadescription";
import Footer from "../components/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(" ");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // === check if user is authenticated and if it's an Admin===

  useEffect(() => {
    if (isAuthenticated) {
      if (authAPI.isAdmin()) {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        setIsAdmin(false);
        navigate("/recettes");
      }
    }
  }, [isAuthenticated]);

  // === manage fields ===

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  // === manage submit form ===

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse, ou alors les informations ne correspondent pas"
      );
    }
  };

  // === JSX RETURN ===
  return (
    <div className="container">
      <Header title="Se connecter" />
      <Metadescription title="Sandrine Coupart - Connexion" />
      <main id="loginPage">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Adresse email</label>
            <input
              value={credentials.username}
              onChange={handleChange}
              type="email"
              placeholder="Adresse email de connexion"
              name="username"
              className="form-control"
              id="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              value={credentials.password}
              onChange={handleChange}
              type="password"
              placeholder="Mot de passe"
              name="password"
              className="form-control"
              id="password"
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <div className="form-group">
            <a href="#">Mot de passe oublié</a>
            <button className="ctaButton" type="submit">
              Je me connecte
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
