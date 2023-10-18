import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const RecipePage = ({ recipe }) => {
  // === Responsive === //
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 400px)",
  });
  // ============================== And css media queries on recipe.scss//

  return (
    <>
      <img src={recipe.imageUrl} />
      <p id="recipeDescription">{recipe.description}</p>
      <div id="preparationSquare" className="recipeSquare">
        <h3 className="recipeItemTitle">Préparation</h3>
        <div id="preparationItems">
          <p id="prepTimeInfo">Préparation: {recipe.prepTime} min</p>
          <p id="cookTimeInfo">Cuisson: {recipe.cookTime} min</p>
          <p id="restTimeInfo">Repos: {recipe.restTime} min</p>
        </div>
      </div>
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
        <div className="recipeItem">
          <h3 className="recipeItemTitle">Ingrédients</h3>
          <div id="ingredientsList">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredientCheckbox">
                <label htmlFor="ingredient">{ingredient}</label>
                <input type="checkbox" name="ingredient" id={index}></input>
              </div>
            ))}
          </div>
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
