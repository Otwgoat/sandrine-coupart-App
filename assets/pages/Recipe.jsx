import React, { useEffect, useState } from "react";
import recipesApi from "../services/recipesApi";
import Header from "../components/Header";
import Metadescription from "../components/Metadescription";
import ReviewInput from "../components/ReviewInput";
import reviewsApi from "../services/reviewsApi";
import authAPI from "../services/authAPI";
import jwtDecode from "jwt-decode";
import RecipePage from "../components/RecipePage";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Recipe = () => {
  const [publicRecipe, setPublicRecipe] = useState();
  const [recipe, setRecipe] = useState();
  const [user, setUser] = useState();
  const [averageRate, setAverageRate] = useState();
  const [reviews, setReviews] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => setIsVisible(!isVisible);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );
  const [lastReview, setLastReview] = useState();
  const updateLastReview = (data) => {
    console.log(data);
    let newReview = {
      review: data.review,
      rate: data.rate,
      user: {
        email: user.username,
      },
    };
    console.log(newReview);
    setReviews((reviews) => [...reviews, newReview]);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const recipeId = pathname.substring(pathname.lastIndexOf("/") + 1);
    recipesApi.findRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
      if (recipe.requireAuth === false) {
        console.log(recipe.requireAuth);
        setPublicRecipe(true);
      }
      if (recipe) {
        const rates = recipe.rateReviews.map((review) => review.rate);
        const averageCount =
          rates.reduce((total, rate) => total + rate, 0) / rates.length;
        setAverageRate(parseFloat(averageCount.toFixed(1)));
      }
    });
    reviewsApi.getReviews(recipeId).then((reviews) => {
      setReviews(reviews);
      console.log(reviews);
    });
    if (isAuthenticated) {
      let token = window.localStorage.getItem("authToken");
      let jwtData = jwtDecode(token);
      setUser(jwtData);
      console.log(user);
    }
  }, []);
  return (
    <div className="container">
      <Header title={recipe ? recipe.title : "Recette"} />
      <Metadescription
        title={recipe ? recipe.title : "Recette"}
        description={recipe ? recipe.description : "Une délicieuse recette."}
      />
      {recipe && isAuthenticated ? (
        <main id="recipePage">
          <RecipePage recipe={recipe} averageRate={averageRate} />
          <button
            className={isVisible ? "ctaButtonActive" : "ctaButton"}
            id="addReviewBtn"
            onClick={toggleForm}
          >
            Écrire un avis
          </button>
          <div className="reviewsContainer">
            <ReviewInput
              isVisible={isVisible}
              userId={user}
              recipeId={recipe}
              updateLastReview={updateLastReview}
            />
            {reviews &&
              reviews.map((review, index) => (
                <div key={index} className="reviewSquare">
                  <h3>{review.user.email}</h3>
                  <p>{review.review}</p>
                  <p>{review.rate} / 10</p>
                </div>
              ))}
          </div>
        </main>
      ) : recipe && !isAuthenticated && publicRecipe ? (
        <main id="recipePage">
          <RecipePage recipe={recipe} averageRate={averageRate} />
        </main>
      ) : (
        <main id="recipePage">
          <p>
            Vous ne pouvez pas accéder à cette recette si vous n'êtes pas un
            patient. N'hesitez pas à me contacter ou à prendre rendez-vous si
            vous souhaitez plus d'information.
          </p>
          <Button path="/recettes" title="Revenir aux recettes" />
          <Button path="/contact" title="Me contacter" />
        </main>
      )}
    </div>
  );
};

export default Recipe;
