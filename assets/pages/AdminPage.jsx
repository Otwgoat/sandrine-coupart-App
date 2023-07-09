import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Metadescription from "../components/Metadescription";

const AdminPage = () => {
  return (
    <div className="container">
      <Metadescription />
      <Header title="Administration" />
      <main className="adminMain" id="adminPage">
        <div id="adminPageCTAs">
          <Button path="/admin/recettes" title="Gérer les recettes" />
          <Button path="/admin/utilisateurs" title="Gérer les utilisateurs" />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
