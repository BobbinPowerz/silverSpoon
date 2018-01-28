import React from "react";

export const FormBtn = props =>
  <button {...props}  style ={{marginBottom: 5}} className="btn search" type="button">
    {props.children}
  </button>;
