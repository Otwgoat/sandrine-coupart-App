import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Metadescription from "../components/Metadescription";
import topImage from "../../src/images/recipe1.png";
import Button from "../components/Button";
import RecipeCard from "../components/RecipeCard";
import recipesApi from "../services/recipesApi";

const Homepage = () => {
  const [recipes, setRecipes] = useState();
  const [recipe, setRecipe] = useState();
  const [recipesLoaded, setRecipesLoaded] = useState(false);
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
  const compareRecipes = (recipes) => {
    if (recipesLoaded) {
      const filteredRecipes = recipes.filter(
        (recipe) =>
          getAverageRate(recipe) >= 3.5 && recipe.requireAuth === false
      );
      console.log(filteredRecipes);
      if (filteredRecipes.length > 1) {
        let i =
          Math.floor(Math.random() * (filteredRecipes.length - 0 + 1)) + 0;
        console.log(i);
        if (i > filteredRecipes.length - 1) {
          setRecipe(filteredRecipes[0]);
        } else {
          setRecipe(filteredRecipes[i]);
        }
      } else {
        setRecipe(filteredRecipes);
      }
    }
  };
  useEffect(() => {
    compareRecipes(recipes);
    console.log(recipesLoaded);
  }, [recipesLoaded]);

  useEffect(() => {
    recipesApi.findAllRecipes(11).then((recipes) => {
      console.log(recipes);
      setRecipes(recipes);
      setRecipesLoaded(true);
    });
  }, []);
  return (
    <div className="container">
      <Metadescription
        title="Sandrine Coupart - Diététicienne"
        description="Diétécienne et nutritionniste à Caen, je vous accompagne au quotidien pour votre bien-être, en vous proposant des recettes qui ne priveront pas vos papilles."
      />
      <Header title="Sandrine Coupart" />
      <main id="homepage">
        <div id="topOfPage">
          <div id="topOfPageImg">
            <img src={topImage} alt="Sandrine Coupart" />
          </div>
          <div id="topOfPagePresentation">
            <h2 id="presentationTitle">Diététicienne Nutrionniste</h2>
            <p id="presentationText">
              "Bonjour, je suis Sandrine Coupart , diététicienne et nutrionniste
              à Caen. Je vous propose ici de délicieuses recettes du quotidien,
              ou de prendre rendez-vous pour une consultation et obtenir des
              recettes adaptées à votre régime alimentaire."
            </p>
          </div>
          <div id="topOfPageCTA">
            <Button path="/contact" title="Me contacter" />
            <Button path="/recettes" title="Découvrir mes recettes" />
          </div>
        </div>
        <div id="dailyRecipeContainer">
          <h2 id="dailyRecipeTitle">Une de vos recettes préférées</h2>
          {recipe && (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              allergens={recipe.allergens}
              review={getAverageRate(recipe)}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              restTime={recipe.restTime}
              requireAuth={recipe.requireAuth}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
