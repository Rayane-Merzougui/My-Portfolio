import React from "react";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/">
          <li>Acceil</li>
        </NavLink>
      </ul>
      <ul>
        <NavLink to="/About">
          <li>A propos</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
