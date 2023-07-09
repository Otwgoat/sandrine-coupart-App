import React, { useEffect, useState } from "react";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import usersApi from "../../services/usersApi";
import { useNavigate } from "react-router-dom";

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
      <Header title="Fiche d'utilisateur" />
      <main className="adminMain">
        {user && (
          <div id="userProfile">
            <h2>
              {user.lastName} {user.firstName}
            </h2>
            <p>{user.email}</p>
            <div>
              <p>Allergène(s): </p>
              {user.allergens.map((allergen, index) => (
                <p key={index}>{allergen}</p>
              ))}
            </div>
            <div>
              <p>Régime(s): </p>
              {user.diet.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div className="buttons">
              <button className="ctaButton">Contacter</button>
              <button className="ctaButton" onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserPage;
