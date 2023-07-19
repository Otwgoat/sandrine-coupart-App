import React, { useEffect, useState } from "react";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import UserForm from "../../components/UserForm";
import usersApi from "../../services/usersApi";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => setIsVisible(!isVisible);
  const [correspondantUsers, setCorrespondantUsers] = useState();
  const searchingUser = (toSearch) => {
    let userLastName = toSearch.toLowerCase();
    if (userLastName === "") {
      setCorrespondantUsers();
    } else {
      const filteredUsers = users.filter((user) =>
        user.lastName.toLowerCase().includes(userLastName)
      );
      setCorrespondantUsers(filteredUsers);
    }
  };
  useEffect(() => {
    usersApi.findAllUsers().then((users) => setUsers(users));
    console.log(users);
  }, []);
  return (
    <div className="container">
      <Metadescription />
      <Header title="Gérer les patients" />
      <main className="adminMain">
        <Link to="/admin" className="prevLink">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#3E5378" }} />{" "}
          Retour à l'écran précédent
        </Link>
        <button
          className={isVisible ? "ctaButtonActive" : "ctaButton"}
          id="addUserBtn"
          onClick={toggleForm}
        >
          {isVisible ? "Retour à la liste des patients" : "Créer un patient"}
        </button>
        <UserForm isVisible={isVisible} />
        {!isVisible && (
          <div className="adminList">
            <input
              type="text"
              id="searchUser"
              name="searchUser"
              placeholder="Chercher un patient"
              onChange={(e) => searchingUser(e.target.value)}
            />
            {correspondantUsers && correspondantUsers.length >= 1 ? (
              <h2>Liste des {correspondantUsers.length} patients</h2>
            ) : (
              <h2>Liste des {users.length} patients</h2>
            )}

            {correspondantUsers && correspondantUsers.length >= 1
              ? correspondantUsers.map((user, index) => (
                  <div className="adminListItem" key={index}>
                    <p>
                      {user.lastName} {user.firstName}
                    </p>
                    <Button
                      path={"/admin/utilisateur/" + user.id}
                      title={
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ color: "#68B0AB" }}
                        />
                      }
                    />
                  </div>
                ))
              : users.map((user, index) => (
                  <div className="adminListItem" key={index}>
                    <p>
                      {user.lastName} {user.firstName}
                    </p>
                    <Button
                      path={"/admin/utilisateur/" + user.id}
                      title={
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ color: "#68B0AB" }}
                        />
                      }
                    />
                  </div>
                ))}
            <Button path={"/admin"} title="Revenir à l'écran précédent" />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;
