import React, { useContext } from "react";
import "../assets/styles/card.scss";
import { useNavigate } from "react-router-dom";
import { useFavoriteRecipes } from "../context/FavoriteRecipeContext";
import { AuthContext } from "../context/AuthContext";

const Card = ({ recipe, deleteRecipe, setSelectedRecipe }) => {
  const navigate = useNavigate();
  const { addFavoriteRecipe, removeFavoriteRecipe, favoriteRecipes } =
    useFavoriteRecipes();
  const { isAuthenticated } = useContext(AuthContext);

  const handleEdit = (e) => {
    e.stopPropagation();
    setSelectedRecipe(recipe);
    navigate(`/edit/${recipe.id}`);
  };

  const isFavorite = favoriteRecipes.some((fav) => fav.id === recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      if (isFavorite) {
        removeFavoriteRecipe(recipe.id);
      } else {
        addFavoriteRecipe(recipe);
      }
    } else {
      alert("Lütfen favori tarif eklemek için giriş yapınız.");
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
        <i className="fa-solid fa-trash"></i>
      </div>
      <div className="edit" onClick={handleEdit}>
        <i className="fa-solid fa-edit"></i>
      </div>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  );
};

export default Card;
