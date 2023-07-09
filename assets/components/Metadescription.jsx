import React from "react";
import { Helmet } from "react-helmet";

const Metadescription = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width" />
    </Helmet>
  );
};

export default Metadescription;
