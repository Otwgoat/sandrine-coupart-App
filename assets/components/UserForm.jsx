import React, { useEffect, useRef, useState } from "react";
import Field from "./adminFormComponents/Field";
import FieldGroup from "./adminFormComponents/FieldGroup";
import DietGroup from "./adminFormComponents/DietGroup";
import usersApi from "../services/usersApi";
import Modal from "./adminFormComponents/Modal";

const UserForm = ({ isVisible }) => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };
  const { faker } = require("@faker-js/faker");
  const formRef = useRef(formRef);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

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
  // ===================
  // === SUBMIT FORM ===
  const [errors, setErrors] = useState({
    email: "",
    lastName: "",
    firstName: "",
    allergens: "",
    diet: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedPassword = faker.internet.password();

    setPassword(generatedPassword);

    let userData = {
      email: email,
      password: generatedPassword,
      firstName: firstName,
      lastName: lastName,
      allergens: allergens,
      diet: diets,
    };
    if (userData.allergens.length > 1) {
      userData.allergens.splice(0, 1);
    }
    console.log(userData);

    try {
      await usersApi.create(userData);
      console.log("submission succeed");
      setErrors({});
      setAllergens([]);
      setDiets([]);
      setOpenModal(true);
      formRef.current.reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response);
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
        } else if (
          error.response.data.detail.includes("1062 Duplicate entry")
        ) {
          setErrors({
            email: "Un utilisateur avec cette adresse email existe déjà.",
          });
        }
      }
    }
    console.log(userData.password);
  };

  useEffect(() => {
    console.log(formRef.current);
  }, [formRef]);
  return (
    <form
      ref={formRef}
      className={isVisible ? "formActive" : "form"}
      id="addUserForm"
      onSubmit={handleSubmit}
    >
      <Field
        label="Nom de famille"
        type="text"
        name="lastname"
        onChange={(e) => setLastName(e.target.value)}
        error={errors.lastName}
      />
      <Field
        label="Prénom"
        type="text"
        name="firstName"
        onChange={(e) => setFirstName(e.target.value)}
        error={errors.firstName}
      />
      <Field
        label="Email"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
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
        entries={diets}
      />

      <button className="ctaButton" type="submit">
        Valider
      </button>
      {openModal === true && (
        <Modal onClose={closeModal} generatedPassword={password} />
      )}
    </form>
  );
};

export default UserForm;
