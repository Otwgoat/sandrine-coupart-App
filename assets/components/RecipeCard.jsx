import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = (props) => {
  const [isRequireAuth, setIsRequireAuth] = useState(props.requireAuth);

  return (
    <div className="recipeCard">
      <img className="recipeImg" src={props.imageUrl} />
      {!props.isAuthenticated && isRequireAuth ? (
        <p className="lockedIcon">
          <FontAwesomeIcon icon={faLock} />
        </p>
      ) : (
        ""
      )}
      <div className="recipeHeader">
        <h3 className="recipeTitle">{props.title}</h3>
        <p className="recipeReview">
          {props.review ? props.review + "/5" : ""}
        </p>
      </div>
      <div className="recipeContent">
        <div className="recipeDescription">
          <p>{props.description}</p>
        </div>
        <div className="recipeBody">
          <p id="prepTimeInfo">Préparation: {props.prepTime} min</p>
          <p id="cookTimeInfo">Cuisson: {props.cookTime} min</p>
          <p id="restTimeInfo">Repos: {props.restTime} min</p>
        </div>
        {props.isAuthenticated ? (
          <Button path={"/recette/" + props.id} title="J'ai faim !" />
        ) : !isRequireAuth ? (
          <Button path={"/recette/" + props.id} title="J'ai faim !" />
        ) : (
          <Button path={"/login"} title="Se connecter" />
        )}
      </div>

      <span className="underLine"></span>
    </div>
  );
};

export default RecipeCard;
