import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Metadescription from "../components/Metadescription";
import topImage from "../../src/images/recipe1.png";
import Button from "../components/Button";
import RecipeCard from "../components/RecipeCard";
import recipesApi from "../services/recipesApi";
import Footer from "../components/Footer";

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
        <div className="homePageSection" id="dailyRecipeContainer">
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
              imageUrl={recipe.imageUrl}
              requireAuth={recipe.requireAuth}
            />
          )}
          <span className="underline"></span>
        </div>
        <div className="homePageSection" id="aboutMeContainer">
          <h2>À propos</h2>
          <p>
            Diplomée d’état, je vous accompagne depuis plus de 10 ans, dans de
            le but de vous apporter les solutions les moins restrictives
            possibles mais tout aussi importantes pour votre santé. Je consulte
            sur rendez-vous dans mon cabinet, à Caen, ou par visio-conférence,
            et nous déterminons ensemble la meilleure approche à adopter pour
            votre bien-être.
          </p>
          <Button path="/contact" title="Prendre rendez-vous" />
          <span className="underLine"></span>
        </div>
        <div className="homePageSection" id="servicesContainer">
          <h2>Mes services</h2>
          <div className="serviceContainer">
            <h4>Consultation</h4>
            <p>Sur rendez-vous , au cabinet ou par visio.</p>
          </div>
          <div className="serviceContainer">
            <h4>Suivi long terme</h4>
            <p>
              Pour des raisons personelles ou pour des raisons de santé, je vous
              accompagne aussi longtemps qu’il le faut.
            </p>
          </div>
          <div className="serviceContainer">
            <h4>Atelier de prévention</h4>
            <p>
              J’anime des ateliers en groupe, de prévention et d’information sur
              la nutrition.
            </p>
          </div>
          <span className="underLine"></span>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
