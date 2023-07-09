import React from "react";
import { Link } from "react-router-dom";

const RecipePage = ({ recipe, averageRate }) => {
  return (
    <>
      <Link className="prevLink" to="/recettes">
        Revenir aux recettes
      </Link>
      <h2>{recipe.title}</h2>
      <img src={recipe.img} />
      <p>{recipe.description}</p>
      <p>{averageRate ? averageRate : ""}</p>
      <div className="recipeItem">
        <h3 className="recipeItemTitle">Allergènes: </h3>
        {recipe.allergens.map((allergen, index) => (
          <p key={index}>{allergen}</p>
        ))}
      </div>
      <div className="recipeItem">
        <h3 className="recipeItemTitle">Régime(s): </h3>
        {recipe.diets.map((diet, index) => (
          <p key={index}>{diet}</p>
        ))}
      </div>

      <div className="recipeItem" id="ingredientList">
        <h3 className="recipeItemTitle">Ingrédients: </h3>
        {recipe.ingredients.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}
      </div>
      <div className="recipeItem" id="stepList">
        <h3 className="recipeItemTitle">Étapes: </h3>
        {recipe.steps.map((step, index) => (
          <p key={index}>
            <span id="stepListIndex">{index + 1}.</span>
            {step}
          </p>
        ))}
      </div>
    </>
  );
};

export default RecipePage;
