import React, { useContext, useState } from "react";
import authAPI from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

// manage the fields
const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(" ");

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const navigate = useNavigate();
  // manage submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      navigate("/recettes");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse, ou alors les informations ne correspondent pas"
      );
    }
  };
  // return the submit form
  return (
    <div>
      <h1>LoginPage</h1>
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
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <button type="submit">Je me connecte</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
