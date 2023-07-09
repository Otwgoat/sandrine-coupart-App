import React, { useEffect, useState } from "react";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import UserForm from "../../components/UserForm";
import usersApi from "../../services/usersApi";
import Button from "../../components/Button";

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
      <Header title="Gérer les utilisateurs" />
      <main className="adminMain">
        <button
          className={isVisible ? "ctaButtonActive" : "ctaButton"}
          id="addUserBtn"
          onClick={toggleForm}
        >
          Ajouter un utilisateur
        </button>
        <UserForm isVisible={isVisible} />
        {!isVisible && (
          <div className="adminList">
            <label htmlFor="searchUser">Chercher un utilisateur</label>
            <input
              type="text"
              id="searchUser"
              name="searchUser"
              placeholder="Nom de famille"
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
                      title="Voir plus"
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
                      title="Voir plus"
                    />
                  </div>
                ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;
