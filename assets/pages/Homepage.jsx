import React from "react";
import Header from "../components/Header";
import Metadescription from "../components/Metadescription";
import topImage from "../../src/images/recipe1.png";
import Button from "../components/Button";
import RecipeCard from "../components/RecipeCard";

const Homepage = () => {
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
          <h2 id="dailyRecipeTitle">La recette du jour</h2>
          <RecipeCard />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
