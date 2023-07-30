import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FieldGroup = (props) => {
  return (
    <div className="formGroup withCta">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="withCtaGroup">
        <input
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
        <div className="formList">
          {props.entries.length >= 1 &&
            props.entries.map((entry, index) => (
              <div className="formItem" key={index}>
                <p>{entry}</p>
                <span onClick={() => props.spanOnClick(index)}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#FA2525" }}
                  />
                </span>
              </div>
            ))}
        </div>
        <button className="ctaButton handleAddButton" onClick={props.onClick}>
          Ajouter {props.button}
        </button>
      </div>
      {props.error && <p className="errorMessage">{props.error}</p>}
    </div>
  );
};

export default FieldGroup;
