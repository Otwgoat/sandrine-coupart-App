import React, { useEffect, useRef, useState } from "react";
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
import Footer from "../components/Footer";

const Recipe = () => {
  const reviewsContainer = useRef(reviewsContainer);
  const [publicRecipe, setPublicRecipe] = useState();
  const [recipe, setRecipe] = useState();
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [user, setUser] = useState();
  const [averageRate, setAverageRate] = useState();

  const [reviews, setReviews] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => {
    setIsVisible(!isVisible);
    reviewsOnClick();
  };
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );
  const [lastReview, setLastReview] = useState();
  // === Update last review === //
  const updateLastReview = (data) => {
    console.log(data);

    let newReview = {
      review: data.review,
      rate: data.rate,
      user: {
        firstName: user.firstname,
      },
    };
    console.log(newReview);
    setReviews((reviews) => [...reviews, newReview]);
  };
  const reviewsOnClick = () => {
    setReviewsVisible(true);
  };
  // === Scroll to reviews === //
  useEffect(() => {
    if (reviewsVisible) {
      reviewsContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [reviewsVisible]);
  // === Get recipe === //
  useEffect(() => {
    const pathname = window.location.pathname;
    const recipeId = pathname.substring(pathname.lastIndexOf("/") + 1);
    recipesApi.findRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
      if (recipe.requireAuth === false) {
        setPublicRecipe(true);
      }
    });
    reviewsApi.getReviews(recipeId).then((reviews) => {
      setReviews(reviews);
    });
    // === Get user === //
    if (isAuthenticated) {
      let token = window.localStorage.getItem("authToken");
      let jwtData = jwtDecode(token);
      setUser(jwtData);
    }
  }, []);
  // === Get average rate === //
  useEffect(() => {
    if (recipe) {
      const rates = recipe.reviews.map((review) => review.rate);
      const averageCount =
        rates.reduce((total, rate) => total + rate, 0) / rates.length;
      setAverageRate(parseFloat(averageCount.toFixed(1)));
    }
  }, [recipe]);

  //=== Format date ===//
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };
  // === JSX RETURN === //
  return (
    <div className="container">
      <Header title={recipe ? recipe.title : "Recette"} />
      <Metadescription
        title={recipe ? recipe.title : "Recette"}
        description={recipe ? recipe.description : "Une délicieuse recette."}
      />
      {recipe && isAuthenticated ? (
        <main id="recipePage">
          <p
            onClick={() => reviewsOnClick()}
            id="discoverReviews"
            to="/recettes"
          >
            Voir les {reviews && reviews.length} avis
          </p>
          <RecipePage
            recipe={recipe}
            averageRate={averageRate ? averageRate : ""}
            onClick={() => reviewsOnClick()}
          />
          <Button path="/recettes" title="Revenir aux recettes" />
          <button onClick={toggleForm} className="ctaButton">
            Donner mon avis
          </button>
          <div className="reviewsContainer" ref={reviewsContainer}>
            <ReviewInput
              isVisible={isVisible}
              userId={user}
              recipeId={recipe}
              updateLastReview={updateLastReview}
            />
            {reviews &&
              reviewsVisible &&
              reviews.map((review, index) => (
                <div key={index} className="reviewSquare">
                  <div className="reviewHeader">
                    <h3 id="reviewUser">
                      {review.user.firstName}{" "}
                      <span id="reviewCreatedAt">
                        le{" "}
                        {review.createdAt
                          ? formatDate(review.createdAt)
                          : formatDate(Date())}
                      </span>
                    </h3>
                    <p id="reviewRate">{review.rate} / 5</p>
                  </div>

                  <p id="review">{review.review}</p>
                  <span className="underLine"></span>
                </div>
              ))}
          </div>
        </main>
      ) : recipe && !isAuthenticated && publicRecipe ? (
        <main id="recipePage">
          <RecipePage recipe={recipe} averageRate={averageRate} />
          <Button path="/recettes" title="Revenir aux recettes" />
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
      <Footer />
    </div>
  );
};

export default Recipe;
