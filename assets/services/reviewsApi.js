import axios from "axios";
import apiPath from "./connectAPI";


function getReviews (recipeId) {
    return axios
    .get(apiPath("avis?recipeId=" + recipeId))
    .then((response) => {
        const reviews = response.data;
        console.log(reviews);
        return reviews;
    })
    .catch((error) => console.log(error.response));
}
function createReview (reviewData, recipeId){
    return axios.post(apiPath("avis?recipeId=" + recipeId), reviewData)
}
export default {
    getReviews,
    createReview
}