import React, { useEffect, useState } from "react";
import reviewsApi from "../services/reviewsApi";

const ReviewInput = ({ isVisible, recipeId, userId, updateLastReview }) => {
  const [recipe, setRecipe] = useState(recipeId);
  const [user, setUser] = useState(userId);
  const [reviewList, setReviewList] = useState([]);
  const [rate, setRate] = useState();
  const [review, setReview] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let reviewData = {
      rate: rate,
      review: review,
    };
    console.log(reviewData);
    try {
      await reviewsApi
        .createReview(reviewData, recipe.id)
        .then(updateLastReview(reviewData));
      console.log("submission succeed");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response);
        const violations = error.response.data.violations;
        console.log(violations);
      }
    }
  };

  const possibleRates = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <form className={isVisible ? "formActive" : "form"} onSubmit={handleSubmit}>
      <div id="rateGroup">
        <label htmlFor="rate">Note: </label>
        <select onChange={(e) => setRate(Number(e.target.value))}>
          {possibleRates.map((rate, index) => (
            <option value={rate} key={index}>
              {rate}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="review">Votre avis: </label>
      <textarea
        onChange={(e) => setReview(e.target.value)}
        name="review"
        id="review"
        placeholder="Ecrivez votre avis..."
      ></textarea>
      <button className="ctaButton" type="submit">
        Envoyer
      </button>
    </form>
  );
};

export default ReviewInput;
