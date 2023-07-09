import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import RecipeForm from "../../components/RecipeForm";
import Metadescription from "../../components/Metadescription";
import recipesApi from "../../services/recipesApi";
import Button from "../../components/Button";

const AdminRecipes = () => {
  const inputRef = useRef(inputRef);
  const [recipes, setRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => setIsVisible(!isVisible);
  const [correspondantRecipes, setCorrespondantRecipes] = useState();

  const searchingRecipe = (toSearch) => {
    let recipeName = toSearch.toLowerCase();
    if (recipeName === "") {
      setCorrespondantRecipes();
    } else {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(recipeName)
      );
      setCorrespondantRecipes(filteredRecipes);
    }

    console.log(correspondantRecipes);
  };
  useEffect(() => {
    recipesApi.findAllRecipes(11).then((recipes) => setRecipes(recipes));
    console.log(inputRef.current.target);
  }, [inputRef]);

  return (
    <div className="container">
      <Metadescription />
      <Header title="Gérer les recettes" />
      <main className="adminMain" id="adminRecipesPage">
        <button
          className={isVisible ? "ctaButtonActive" : "ctaButton"}
          id="addRecipeBtn"
          onClick={toggleForm}
        >
          Ajouter une recette
        </button>

        <RecipeForm isVisible={isVisible} />
        {!isVisible && (
          <div className="adminList">
            <label htmlFor="searchRecipe">Chercher une recette</label>
            <input
              ref={inputRef}
              type="text"
              id="searchRecipe"
              name="searchRecipe"
              placeholder="Salade de quinoa aux légumes"
              onChange={(e) => searchingRecipe(e.target.value)}
            />
            {correspondantRecipes && correspondantRecipes.length >= 1 ? (
              <h2>Liste des {correspondantRecipes.length} recettes</h2>
            ) : (
              <h2>Liste des {recipes.length} recettes</h2>
            )}

            {correspondantRecipes && correspondantRecipes.length >= 1
              ? correspondantRecipes.map((recipe, index) => (
                  <div className="adminListItem" key={index}>
                    <p>{recipe.title}</p>
                    <Button
                      path={"/admin/recette/" + recipe.id}
                      title="Voir plus"
                    />
                  </div>
                ))
              : recipes.map((recipe, index) => (
                  <div className="adminListItem" key={index}>
                    <p>{recipe.title}</p>
                    <Button
                      path={"/admin/recette/" + recipe.id}
                      title="Voir plus"
                    />
                  </div>
                ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRecipes;
