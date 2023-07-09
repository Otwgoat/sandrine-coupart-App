import React from "react";

const DietGroup = (props) => {
  const possibleDiets = [
    "Sans lactose",
    "Végétarien",
    "Vegan",
    "Sans sel",
    "Sans Gluten",
    "Protéiné",
  ];
  return (
    <div className="formGroup withCta">
      <label htmlFor="diets">Régime(s) alimentaire</label>
      <div className="withCtaGroup">
        <select name="diets" value={props.value} onChange={props.onChange}>
          <option value="">Selectionnez une option</option>
          {possibleDiets.map((diet, index) => (
            <option key={index} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        <div className="formList">
          {props.entries &&
            props.entries.length >= 1 &&
            props.entries.map((diet, index) => (
              <div className="formItem" key={index}>
                <p>{diet}</p>
                <span onClick={() => props.spanOnClick(index)}>S</span>
              </div>
            ))}
        </div>
        <button className="ctaButton handleAddButton" onClick={props.onClick}>
          Ajouter le régime
        </button>
      </div>
      {props.error && <p className="errorMessage">{props.error}</p>}
    </div>
  );
};

export default DietGroup;
