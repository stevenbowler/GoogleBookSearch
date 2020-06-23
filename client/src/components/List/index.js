//@ts-check
/**@module */
import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

/**@function List */
export function List({ children }) {
  return (
    <div className="list-div" >
      <ul className="list-group" style={{ color: 'black' }}>{children}</ul>
    </div>
  );
}

/**@function ListItem */
export function ListItem({ children }) {
  return <li className="list-group-item list-style" style={{ color: `rgb(${132}, ${31}, ${39})`, backgroundColor: `rgb(${132}, ${31}, ${39})` }}>{children}</li>;
}

/**@function GoogleListItem */
export function GoogleListItem({ children }) {
  return <li className="list-group-item list-style" id="list-style" style={{ backgroundColor: `rgb(${132}, ${31}, ${39})`, color: 'black' }}>{children}</li>;
}
