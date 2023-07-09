import axios from "axios";
import apiPath from "./connectAPI";

function findAllRecipes(customLimit) {
    
    return axios
    .get(apiPath("recettes?limit=" + customLimit))
    .then(response => {
        const recipes = response.data ; 
        console.log(recipes)
        return recipes;
    })
    .catch(error => console.log(error.response));
}
function findRecipe (id) {
    return axios.get(apiPath("recettes/" + id))
    .then(response => {
        const recipe = response.data;
        console.log(recipe);
        return recipe;
    })
    .catch(error => console.log(error.response));
}
function sendRecipe (recipeData){
    return axios.post(apiPath("recettes"), recipeData)
    

}
function deleteRecipe (id) {
    return axios.delete(apiPath("recettes/" + id))
}
export default {
    findAllRecipes,
    sendRecipe,
    findRecipe,
    deleteRecipe
};