import React from "react";
import { Link } from "react-router-dom";

const RecipePage = ({ recipe }) => {
  return (
    <>
      <div id="recipeHeader"></div>
      <img src={recipe.img} />
      <p id="recipeDescription">{recipe.description}</p>

      <div id="firstSquare" className="recipeSquare">
        <div className="recipeItem">
          <h3 className="recipeItemTitle">Allergène(s)</h3>
          {recipe.allergens.map((allergen, index) => (
            <p key={index}>{allergen}</p>
          ))}
        </div>
        <div className="recipeItem">
          <h3 className="recipeItemTitle">Régime(s)</h3>
          {recipe.diets.map((diet, index) => (
            <p key={index}>{diet}</p>
          ))}
        </div>
      </div>
      <div id="secondSquare" className="recipeSquare">
        <div className="recipeItem" id="ingredientList">
          <h3 className="recipeItemTitle">Ingrédients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index}>{ingredient}</p>
          ))}
        </div>
      </div>
      <div className="recipeSquare" id="thirdSquare">
        <div className="recipeItem" id="stepList">
          <h3 className="recipeItemTitle">Étapes</h3>
          {recipe.steps.map((step, index) => (
            <React.Fragment key={index}>
              <h5>Étape {index + 1}</h5>
              <p className="" key={index}>
                {step}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipePage;
