import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <button className="ctaButton">
      <Link to={props.path}>{props.title}</Link>
    </button>
  );
};

export default Button;
