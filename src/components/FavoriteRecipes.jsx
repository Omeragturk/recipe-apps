import React from "react";
import { useFavoriteRecipes } from "../context/FavoriteRecipeContext";

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useFavoriteRecipes();

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <div className="card-list">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
