import React from "react";
import Button from "../Button";

const Modal = ({ onClose, generatedPassword }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h3>Utilisateur créé</h3>
        <p>Le mot de passe généré pour l'utilisateur est le suivant : </p>
        <p>{generatedPassword}</p>
        <button className="ctaButton" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
