import React, { useRef, useState, useEffect } from "react";
import recipesApi from "../services/recipesApi";
import DietGroup from "./adminFormComponents/DietGroup";
import StepGroup from "./adminFormComponents/StepGroup";
import Field from "./adminFormComponents/Field";
import FieldGroup from "./adminFormComponents/FieldGroup";

const RecipeForm = ({ isVisible }) => {
  const formRef = useRef(formRef);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCooktime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [image, setImage] = useState("");
  const [requireAuth, setRequireAuth] = useState(false);
  // === Watching ingredients field ===
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const handleAddIngredient = (e) => {
    e.preventDefault();
    let newIngredient = ingredient;
    setIngredients((ingredients) => [...ingredients, newIngredient]);
    setIngredient("");
  };
  const deleteIngredient = (index) => {
    setIngredients((prevIngredients) => {
      let updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    });
  };
  // ================================
  // === Watching allergens field ===
  const [allergens, setAllergens] = useState(["Aucun"]);
  const [allergen, setAllergen] = useState("");
  const handleAddAllergen = (e) => {
    e.preventDefault();
    let newAllergen = allergen;
    setAllergens((allergens) => [...allergens, newAllergen]);
    setAllergen("");
  };
  const deleteAllergen = (index) => {
    setAllergens((prevAllergens) => {
      let updatedAllergens = [...prevAllergens];
      updatedAllergens.splice(index, 1);
      setAllergens(updatedAllergens);
    });
  };

  // ============================
  // === Watching diets field ===
  const [diets, setDiets] = useState([]);
  const [diet, setDiet] = useState("");
  const handleAddDiet = (e) => {
    e.preventDefault();
    let newDiet = diet;
    setDiets((diets) => [...diets, newDiet]);
    setDiet("");
  };
  const deleteDiet = (index) => {
    setDiets((prevDiets) => {
      let updatedDiets = [...prevDiets];
      updatedDiets.splice(index, 1);
      setDiets(updatedDiets);
    });
  };
  // ============================
  // === Watching steps field ===
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");
  const handleAddStep = (e) => {
    e.preventDefault();
    let newStep = step;
    setSteps((steps) => [...steps, newStep]);
    setStep("");
  };
  const deleteStep = (index) => {
    setSteps((prevSteps) => {
      let updatedSteps = [...prevSteps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
    });
  };
  // ===================
  // === SUBMIT FORM ===
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    prepTime: "",
    cookTime: "",
    restTime: "",
    ingredients: "",
    allergens: "",
    diets: "",
    steps: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let recipeData = {
      title: title,
      description: description,
      prepTime: prepTime,
      cookTime: cookTime,
      restTime: restTime,
      ingredients: ingredients,
      allergens: allergens,
      diets: diets,
      steps: steps,
      image: image,
      requireAuth: requireAuth,
    };
    if (recipeData.allergens.length > 1) {
      recipeData.allergens.splice(0, 1);
    }
    console.log(recipeData.allergens);
    try {
      await recipesApi.sendRecipe(recipeData);
      console.log("submission succeed");
      setErrors({});
      setIngredients([]);
      setAllergens([]);
      setDiets([]);
      setSteps([]);
      formRef.current.reset();
    } catch (error) {
      if (error.response && error.response.data) {
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

  // ==========================
  // === JSX RETURN === //
  return (
    <form
      ref={formRef}
      className={isVisible ? "formActive" : "form"}
      id="addRecipeForm"
      onSubmit={handleSubmit}
    >
      <Field
        label="Titre"
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
      />
      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="errorMessage">{errors.description}</p>
        )}
      </div>
      <Field
        label="Temps de préparation"
        name="prepTime"
        type="number"
        value={prepTime}
        onChange={(e) => setPrepTime(Number(e.target.value))}
        error={errors.prepTime}
      />
      <Field
        label="Temps de cuisson"
        name="cookTime"
        type="number"
        onChange={(e) => setCooktime(Number(e.target.value))}
      />
      <Field
        label="Temps de repos"
        name="restTime"
        type="number"
        onChange={(e) => setRestTime(Number(e.target.value))}
      />
      <FieldGroup
        name="ingredients"
        label="Ingrédients"
        button="l'ingrédient"
        value={ingredient}
        entries={ingredients}
        onClick={handleAddIngredient}
        spanOnClick={deleteIngredient}
        onChange={(e) => setIngredient(e.target.value)}
        error={errors.ingredients}
      />
      <FieldGroup
        name="allergens"
        label="Allergènes"
        button="l'allergène"
        value={allergen}
        entries={allergens}
        onClick={handleAddAllergen}
        spanOnClick={deleteAllergen}
        onChange={(e) => setAllergen(e.target.value)}
        error={errors.allergens}
      />

      <DietGroup
        diets={diets}
        onClick={handleAddDiet}
        spanOnClick={deleteDiet}
        onChange={(e) => setDiet(e.target.value)}
        error={errors.diets}
      />
      <StepGroup
        steps={steps}
        value={step}
        spanOnClick={deleteStep}
        onChange={(e) => setStep(e.target.value)}
        onClick={handleAddStep}
        error={errors.steps}
      />
      <Field
        label="Lien de l'image"
        name="image"
        type="text"
        onChange={(e) => setImage(e.target.value)}
      />
      <div className="formGroup withCheckbox">
        <label htmlFor="authentification">Authentification requise ?</label>
        <input
          type="checkbox"
          name="authentification"
          id="authentification"
          onChange={(e) => setRequireAuth(!requireAuth)}
        />
      </div>
      <button className="ctaButton" type="submit">
        Valider
      </button>
    </form>
  );
};

export default RecipeForm;
