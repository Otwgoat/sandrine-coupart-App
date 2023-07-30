import React, { useState } from "react";

const ImageInput = ({handleOnChange}) => {
  const [imageUrl, setImageUrl] = useState();

  return (
    <div className="formGroup" id="inputFileFormGroup">
      <label htmlFor="inputFile">Image</label>
      <input type="file" id="inputFile" name="inputFile" onChange={handleOnChange}/>
    </div>
  );
};

export default ImageInput;
