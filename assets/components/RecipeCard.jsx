import React from "react";
import Button from "./Button";

const RecipeCard = (props) => {
  return (
    <div className="recipeCard">
      <img className="recipeImg" src={props.img} alt="image de la recette" />
      <div className="recipeHeader">
        <h3 className="recipeTitle">{props.title}</h3>
        <p className="recipeReview">{props.review} / 10</p>
      </div>
      <div className="recipeDescription">
        <p>{props.description}</p>
      </div>
      <div className="recipeBody">
        <p>Préparation: {props.prepTime} min</p>
        <p>Cuisson: {props.cookTime} min</p>
        <p>Repos: {props.restTime} min</p>
      </div>
      <Button path={"/recette/" + props.id} title="J'ai faim !" />
    </div>
  );
};

export default RecipeCard;
