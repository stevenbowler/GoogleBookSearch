//@ts-check
/**@module 
 * @requires react
*/
import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddBtn(props) {
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      <strong style={{ backgroundColor: "green", color: "white", fontSize: "15px" }}>+</strong>
    </span>
  );
}

export default AddBtn;
