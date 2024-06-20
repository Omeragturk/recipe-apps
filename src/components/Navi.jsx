import React, { useContext } from "react";
import "../assets/styles/navi.scss";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navi = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="brand">
        <img
          src="https://www.shutterstock.com/image-vector/restaurant-logo-spoon-fork-icon-260nw-1656268684.jpg"
          alt="Brand Logo"
        />
        <h3>Recipe Platform</h3>
      </div>
      <ul>
        <li>
          <NavLink to="/" exact="true">
            Recipes
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/add">Add Recipe</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navi;
