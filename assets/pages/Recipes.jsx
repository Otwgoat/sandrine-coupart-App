import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recettes")
      .then((res) => {
        setRecipes(res.data), console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <h2 key={recipe.id}>{recipe.id}</h2>
      ))}
    </div>
  );
};

export default Recipes;
