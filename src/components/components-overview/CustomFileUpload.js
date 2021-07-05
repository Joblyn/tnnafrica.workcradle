import React from "react";

const CustomFileUpload = ({label, id, ...restProps }) => {
  return (
  <div className="custom-file">
    <input type="file" className="custom-file-input" id={id} {...restProps}/>
    <label className="custom-file-label" htmlFor="customFile2">
      {label}
    </label>
  </div>
)};

export default CustomFileUpload;
