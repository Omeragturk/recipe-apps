// components/FavoriteRecipes.js
import React from "react";
import { useFavoriteRecipes } from "../context/FavoriteRecipeContext";

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useFavoriteRecipes();

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <div className="card-list">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
