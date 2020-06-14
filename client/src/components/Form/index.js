//@ts-check
/**@module 
 * @requires react
*/
import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} style={{ backgroundColor: `rgb(${132}, ${31}, ${39})` }} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="5" {...props} style={{ backgroundColor: `rgb(${132}, ${31}, ${39})` }} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
