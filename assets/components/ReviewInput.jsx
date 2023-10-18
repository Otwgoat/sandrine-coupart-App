import React, { useRef, useState } from "react";
import reviewsApi from "../services/reviewsApi";
// === CSS styles for this form can be found on recipe.scss === //
// =========================================================== //
const ReviewInput = ({ isVisible, recipeId, userId, updateLastReview }) => {
  const formRef = useRef(formRef);
  const [recipe, setRecipe] = useState(recipeId);
  const [user, setUser] = useState(userId);
  const [reviewList, setReviewList] = useState([]);
  const [rate, setRate] = useState();
  const possibleRates = ["", 1, 2, 3, 4, 5];
  const [review, setReview] = useState();
  const [dateTime, setDateTime] = useState(new Date().toLocaleDateString("fr"));
  const [errors, setErrors] = useState({
    rate: "",
    review: "",
  });
  // === Sending Review === //
  const handleSubmit = async (e) => {
    e.preventDefault();

    let reviewData = {
      rate: rate,
      review: review,
    };
    console.log(reviewData);
    try {
      if (reviewData.rate && reviewData.review) {
        await reviewsApi
          .createReview(reviewData, recipe.id)
          .then(updateLastReview(reviewData));

        console.log("submission succeed");
      }
      formRef.current.reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
        const violations = error.response.data.violations;
        console.log(violations);
        // Check if there's violation(s) and assign them to the properties in error's useState
        //====================================================================================
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, title }) => {
            apiErrors[propertyPath] = title;
          });
          setErrors(apiErrors);
        }
      }
    }
  };

  return (
    <form
      id="reviewInput"
      className={isVisible ? "formActive" : "form"}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div id="rateGroup">
        <label htmlFor="rate">Note: </label>
        <select onChange={(e) => setRate(Number(e.target.value))}>
          {possibleRates.map((rate, index) => (
            <option value={rate} key={index}>
              {rate}
            </option>
          ))}
        </select>
        {errors.rate && <p className="errorMessage">{errors.rate}</p>}
      </div>

      <label id="textAreaLabel" htmlFor="review">
        Votre avis:{" "}
      </label>
      <textarea
        onChange={(e) => setReview(e.target.value)}
        name="review"
        id="review"
        placeholder="Ecrivez votre avis..."
      ></textarea>
      {errors.review && <p className="errorMessage">{errors.review}</p>}
      <div className="centerButton">
        <button className="ctaButton" type="submit">
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default ReviewInput;
