import React, { useEffect, useState } from "react";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import usersApi from "../../services/usersApi";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminUserPage = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleDelete = async () => {
    await usersApi
      .deleteUser(user.id)
      .then((response) => console.log(response));
    navigate("/admin/utilisateurs");
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const userId = pathname.substring(pathname.lastIndexOf("/") + 1);
    usersApi.findUser(userId).then((user) => setUser(user));
  }, []);

  return (
    <div className="container">
      <Metadescription />
      <Header title="Fiche du patient" />
      <main className="adminMain">
        <Link to="/admin/utilisateurs" className="prevLink">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#3E5378" }} />{" "}
          Retour à la liste des patients
        </Link>
        {user && (
          <div id="userProfile">
            <h2>
              {user.lastName} {user.firstName}
            </h2>
            <p>{user.email}</p>
            <div>
              <p className="userProfileItemTitle">Allergène(s): </p>
              {user.allergens.map((allergen, index) => (
                <p key={index}>{allergen}</p>
              ))}
            </div>
            <div>
              <p className="userProfileItemTitle">Régime(s): </p>
              {user.diet.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div className="buttons">
              <button className="ctaButton">Contacter</button>
              <button
                id="deleteButton"
                className="ctaButton"
                onClick={handleDelete}
              >
                Supprimer le patient
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserPage;
