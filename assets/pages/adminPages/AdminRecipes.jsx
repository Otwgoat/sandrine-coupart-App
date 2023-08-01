import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import RecipeForm from "../../components/RecipeForm";
import Metadescription from "../../components/Metadescription";
import recipesApi from "../../services/recipesApi";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminRecipes = () => {
  const inputRef = useRef(inputRef);
  const [recipes, setRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => setIsVisible(!isVisible);
  const [correspondantRecipes, setCorrespondantRecipes] = useState();
  const deleteRecipe = (id) => {};
  const searchingRecipe = (toSearch) => {
    let recipeName = toSearch.toLowerCase();
    if (recipeName === "") {
      setCorrespondantRecipes();
    } else {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(recipeName)
      );
      setCorrespondantRecipes(filteredRecipes);
    }

    console.log(correspondantRecipes);
  };
  useEffect(() => {
    recipesApi.findAllRecipes(11).then((recipes) => setRecipes(recipes));
    console.log(inputRef.current.target);
  }, [inputRef]);

  return (
    <div className="container">
      <Metadescription />
      <Header title="Gérer les recettes" />
      <main className="adminMain" id="adminRecipesPage">
        <Link to="/admin" className="prevLink">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#3E5378" }} />{" "}
          Revenir à l'écran précédent
        </Link>
        <button
          className={isVisible ? "ctaButtonActive" : "ctaButton"}
          id="addRecipeBtn"
          onClick={toggleForm}
        >
          Ajouter une recette
        </button>

        <RecipeForm isVisible={isVisible} />
        {!isVisible && (
          <div className="adminList">
            <input
              ref={inputRef}
              type="text"
              id="searchRecipe"
              name="searchRecipe"
              placeholder="Chercher une recette"
              onChange={(e) => searchingRecipe(e.target.value)}
            />
            {correspondantRecipes && correspondantRecipes.length >= 1 ? (
              <h2>Liste des {correspondantRecipes.length} recettes</h2>
            ) : (
              <h2>Liste des {recipes.length} recettes</h2>
            )}

            {correspondantRecipes && correspondantRecipes.length >= 1
              ? correspondantRecipes.map((recipe, index) => (
                  <div className="adminListItem" key={index}>
                    <p>{recipe.title}</p>
                    <Button
                      path={"/admin/recette/" + recipe.id}
                      title={
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ color: "#68B0AB" }}
                        />
                      }
                    />
                  </div>
                ))
              : recipes.map((recipe, index) => (
                  <div className="adminListItem" key={index}>
                    <p>{recipe.title}</p>
                    <Button
                      path={"/admin/recette/" + recipe.id}
                      title={
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ color: "#68B0AB" }}
                        />
                      }
                    />
                  </div>
                ))}
            <Button path={"/admin"} title="Revenir à l'écran précédent" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminRecipes;
