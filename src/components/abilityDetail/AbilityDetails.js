import React, { useState } from "react";
import DetailsCalls from "../detail/DetailsCalls";


const AbilityDetails = ability => {
  const [showAbility, setShowAbility] = useState(false);
  return (
    <div className="ability">
      <span key={ability.name} className="s-Ability">
        {" "}
        {ability.name}{" "}
      </span>
      <button
          className="moveButton"
          onClick={() => setShowAbility(!showAbility)}>
        {showAbility ? (
            <i className="fas fa-caret-down"/>
          // <button style={{ fontSize: 17 }} />
        ) : (
          // <button style={{ fontSize: 17 }} />
            <i className="fas fa-caret-down"/>
        )}
      </button>
      <div className="callsContainer">
        {showAbility ? <DetailsCalls abilityUrl={ability.url} /> : ""}
      </div>
    </div>
  );
};

export default AbilityDetails;
