import React from "react";

import "./Pages.css";

const Pages = ({ handlePagesClick }) => {
  return (
    <div className="pokeButtons">
      <button
        onClick={() => handlePagesClick("prev")}
        className="paginationBtn">
          <i className="fas fa-arrow-left"/>
      </button>

      <button
        onClick={() => handlePagesClick("next")}
        className="paginationBtn">
          <i className="fas fa-arrow-right"/>
      </button>
    </div>
  );
};
export default Pages;
