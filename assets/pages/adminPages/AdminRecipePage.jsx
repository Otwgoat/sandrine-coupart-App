import React, { useEffect, useState } from "react";
import recipesApi from "../../services/recipesApi";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const AdminRecipePage = () => {
  const [recipe, setRecipe] = useState();
  const navigate = useNavigate();
  const handleDelete = async () => {
    await recipesApi
      .deleteRecipe(recipe.id)
      .then((response) => console.log(response));
    navigate("/admin/recettes");
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const recipeId = pathname.substring(pathname.lastIndexOf("/") + 1);
    recipesApi.findRecipe(recipeId).then((recipe) => setRecipe(recipe));
    console.log(recipe);
  }, []);
  return (
    <div className="container">
      <Metadescription />
      <Header title="Fiche de la recette" />
      <main className="adminMain">
        {recipe && (
          <div id="recipeIndex">
            <h2>{recipe.title}</h2>
            <img src={recipe.img} />
            <p>{recipe.description}</p>
            <p>Temps de préparation: {recipe.prepTime} min</p>
            <p>Temps de cuisson: {recipe.cookTime} min</p>
            <p>Temps de repos: {recipe.restTime} min</p>
            <div>
              <p>Allergènes: </p>
              {recipe.allergens &&
                recipe.allergens.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </div>
            <div>
              <p>Ingrédients: </p>
              {recipe.ingredients &&
                recipe.ingredients.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </div>
            <div>
              <p>Régime(s): </p>
              {recipe.diets &&
                recipe.diets.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div>
              <p>Étapes: </p>
              {recipe.steps &&
                recipe.steps.map((item, index) => (
                  <p key={index}>
                    {index + 1 + "."} {item}
                  </p>
                ))}
            </div>
            <div className="buttons">
              <button className="ctaButton" onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRecipePage;
