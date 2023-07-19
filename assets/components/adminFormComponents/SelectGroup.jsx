import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const SelectGroup = (props) => {
  return (
    <div className="formGroup withCta">
      <label htmlFor={props.labelName}>{props.label}</label>
      <div className="withCtaGroup">
        <select
          name={props.labelName}
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">Selectionnez une option</option>
          {props.itemList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="formList">
          {props.entries &&
            props.entries.length >= 1 &&
            props.entries.map((item, index) => (
              <div className="formItem" key={index}>
                <p>{item}</p>
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
          Ajouter {props.buttonName}
        </button>
      </div>
      {props.error && <p className="errorMessage">{props.error}</p>}
    </div>
  );
};

export default SelectGroup;
