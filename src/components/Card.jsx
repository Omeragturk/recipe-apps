import React, { useContext } from "react";
import "../assets/styles/card.scss";
import { useNavigate } from "react-router-dom";
import {
  FavoriteRecipeContext,
  useFavoriteRecipes,
} from "../context/FavoriteRecipeContext"; // Context doğru şekilde import edildi

const Card = ({ recipe, deleteRecipe, setSelectedRecipe }) => {
  const navigate = useNavigate();
  const { addFavoriteRecipe, favoriteRecipes } = useFavoriteRecipes(); // useFavoriteRecipes hook'u ile context'ten değerleri al

  const handleEdit = (e) => {
    e.stopPropagation();
    setSelectedRecipe(recipe);
    navigate(`/edit/${recipe.id}`);
  };

  const isFavorite = favoriteRecipes.some((fav) => fav.id === recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      // Remove from favorites
      deleteRecipe(recipe.id);
    } else {
      // Add to favorites
      addFavoriteRecipe(recipe);
    }
  };

  return (
    <div className="card" onClick={() => setSelectedRecipe(recipe)}>
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorite ? (
          <i className="fa-solid fa-star" style={{ color: "#ec3c3c" }}></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </div>
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
