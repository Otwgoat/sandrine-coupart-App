import React from "react";

const Modal = ({ onClose, generatedPassword }) => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h3>Utilisateur créé</h3>
        <p>
          Le mot de passe généré pour l'utilisateur est le suivant :{" "}
          {generatedPassword}
        </p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;
