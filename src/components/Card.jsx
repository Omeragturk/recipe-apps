import React from "react";
import "../assets/styles/card.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ recipe, deleteRecipe, setSelectedRecipe }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    setSelectedRecipe(recipe);
    navigate(`/edit/${recipe.id}`);
  };

  return (
    <div className="card" onClick={() => setSelectedRecipe(recipe)}>
      <div
        className="delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteRecipe(recipe.id);
        }}
      >
        X
      </div>
      <div className="edit" onClick={handleEdit}>
        Edit
      </div>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  );
};

export default Card;
