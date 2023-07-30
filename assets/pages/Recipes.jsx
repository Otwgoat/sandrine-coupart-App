import React from "react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import recipesApi from "../services/recipesApi";
import RecipeCard from "../components/RecipeCard";
import Metadescription from "../components/Metadescription";
import authAPI from "../services/authAPI";
import jwtDecode from "jwt-decode";
import usersApi from "../services/usersApi";

const Recipes = () => {
  const [recipes, setRecipes] = useState();
  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [userDiets, setUserDiets] = useState([]);
  const [userAllergens, setUserAllergens] = useState([]);
  const [userFirstname, setUserFirstname] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );
  const [correspondantRecipes, setCorrespondantRecipes] = useState();

  // === Get average rate of a recipe === //
  const getAverageRate = (recipe) => {
    if (recipe.reviews) {
      const rates = recipe.reviews.map((review) => review.rate);
      const averageCount =
        rates.reduce((total, rate) => total + rate, 0) / rates.length;
      return parseFloat(averageCount.toFixed(1));
    } else {
      return " ";
    }
  };
  //=== === //
  /*  === Get user diets and recipes and compare them, to only display corresponding recipes === */
  const loadRecipes = async () => {
    await recipesApi.findAllRecipes(11).then((recipes) => {
      setRecipes(recipes);
      setRecipesLoaded(true);
    });
  };
  const assignDiets = async () => {
    const token = await window.localStorage.getItem("authToken");
    let jwtData = jwtDecode(token);
    setUserDiets(jwtData.diet);
    setUserAllergens(jwtData.allergens);
    setUserFirstname(jwtData.firstname);
    loadRecipes();
  };
  const filterRecipes = () => {
    if (recipesLoaded) {
      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.diets.some((diet) => userDiets.includes(diet)) &&
          recipe.allergens.some((allergen) => !userAllergens.includes(allergen))
      );
      setCorrespondantRecipes(filteredRecipes);
    }
  };

  useEffect(() => {
    filterRecipes();
  }, [recipesLoaded]);

  useEffect(() => {
    if (isAuthenticated) {
      assignDiets();
    } else {
      recipesApi.findAllRecipes(11).then((recipes) => {
        setRecipes(recipes);
        setCorrespondantRecipes(recipes);
      });
    }
  }, []);
  // === === //
  // === Searching Recipes === //
  const searchingRecipe = (toSearch) => {
    let recipeName = toSearch.toLowerCase();
    if (recipeName === "") {
      if (isAuthenticated) {
        filterRecipes();
      } else {
        setCorrespondantRecipes(recipes);
      }
    } else {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(recipeName)
      );
      setCorrespondantRecipes(filteredRecipes);
    }

    console.log(correspondantRecipes);
  };

  //=== === //
  return (
    <div className="container">
      <Header title="Mes recettes" />
      <Metadescription
        title="Sandrine Coupart - Mes recettes"
        description="Découvrez des recettes adaptées à votre régime alimentaire."
      />
      <main id="recipesPage">
        {isAuthenticated ? (
          <div className="mainBanner">
            <h3 id="mainTitle">
              Bonjour {userFirstname}, voici des recettes adaptées à votre
              régime alimentaire.
            </h3>

            <p id="mainIntro">
              Si vous remarquez des effets inhabituels sur votre santé, merci de
              bien vouloir les notés, afin que nous puissions en discuter lors
              de notre prochaine consultation.
            </p>
          </div>
        ) : (
          <div className="mainBanner">
            <h3 id="mainTitle">
              Des recettes faciles à déguster au quotidien, qui raviront vos
              proches et vous-même.
            </h3>

            <p id="mainIntro">
              Je selectionne pour vous des recettes qui vous veulent du bien
              mais qui ne sacrifient pas le plaisir d’un délicieux repas. Pour
              avoir accés à des recettes adaptées à votre régime alimentaire,
              n’hesitez plus et prenez rendez-vous.
            </p>
          </div>
        )}
        <div id="searchBar">
          <input
            type="text"
            id="searchRecipe"
            name="searchRecipe"
            placeholder="Chercher une recette"
            onChange={(e) => searchingRecipe(e.target.value)}
          />
        </div>
        {isAuthenticated ? (
          <div id="recipesContainer">
            {correspondantRecipes ? (
              correspondantRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  isAuthenticated={isAuthenticated}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  allergens={recipe.allergens}
                  review={getAverageRate(recipe)}
                  imageUrl={recipe.imageUrl}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  restTime={recipe.restTime}
                  requireAuth={recipe.requireAuth}
                />
              ))
            ) : (
              <p>
                Aucune recette ne correspond à votre recherche actuellement.
                Revenez plus tard pour découvrir de nouvelles recettes.
              </p>
            )}
          </div>
        ) : (
          <div id="recipesContainer">
            {correspondantRecipes ? (
              correspondantRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  isAuthenticated={isAuthenticated}
                  id={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  allergens={recipe.allergens}
                  review={getAverageRate(recipe)}
                  imageUrl={recipe.imageUrl}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  restTime={recipe.restTime}
                  requireAuth={recipe.requireAuth}
                />
              ))
            ) : (
              <p>
                Aucune recette ne correspond à votre recherche actuellement.
                Revenez plus tard pour découvrir de nouvelles recettes.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Recipes;
