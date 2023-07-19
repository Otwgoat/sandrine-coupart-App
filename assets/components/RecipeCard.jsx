import React, { useState } from "react";
import Button from "./Button";

const RecipeCard = (props) => {
  const [isRequireAuth, setIsRequireAuth] = useState(props.requireAuth);

  return (
    <div className="recipeCard">
      <img className="recipeImg" src={props.img} alt="image de la recette" />
      <div className="recipeHeader">
        <h3 className="recipeTitle">{props.title}</h3>
        <p className="recipeReview">
          {props.review ? props.review + "/5" : ""}
        </p>
      </div>
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
      <span className="underLine"></span>
    </div>
  );
};

export default RecipeCard;
