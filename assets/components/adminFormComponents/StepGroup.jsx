import React from "react";

const StepGroup = (props) => {
  return (
    <div className="formGroup withCta">
      <label htmlFor="steps">Étapes</label>
      <div className="withCtaGroup">
        <textarea value={props.value} name="steps" onChange={props.onChange} />
      </div>
      <div className="formList">
        {props.steps.length >= 1 &&
          props.steps.map((step, index) => (
            <div className="formItem" key={index}>
              <p>{step}</p>
              <span onClick={() => props.spanOnClick(index)}>S</span>
            </div>
          ))}
      </div>
      <button className="ctaButton handleAddButton" onClick={props.onClick}>
        Ajouter l'étape
      </button>
      {props.error && <p className="errorMessage">{props.error}</p>}
    </div>
  );
};

export default StepGroup;
