import React, { useEffect, useState } from "react";
import recipesApi from "../../services/recipesApi";
import Metadescription from "../../components/Metadescription";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import RecipePage from "../../components/RecipePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminRecipePage = () => {
  const [recipe, setRecipe] = useState();
  const navigate = useNavigate();
  const handleDelete = async () => {
    await recipesApi
      .deleteRecipe(recipe.id)
      .then((response) => console.log(response));
    navigate("/admin/recettes");
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const recipeId = pathname.substring(pathname.lastIndexOf("/") + 1);
    recipesApi.findRecipe(recipeId).then((recipe) => setRecipe(recipe));
    console.log(recipe);
  }, []);
  return (
    <div className="container">
      <Metadescription />
      <Header title="Fiche de la recette" />

      <main className="adminMain">
        <Link to="/admin/recettes" className="prevLink">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#3E5378" }} />{" "}
          Retour à la liste des recettes
        </Link>
        {recipe && (
          <div id="recipePage">
            <h3>{recipe.title}</h3>
            <RecipePage recipe={recipe} />
            <div className="buttons">
              <button className="ctaButton" onClick={handleDelete}>
                Supprimer la recette
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRecipePage;
