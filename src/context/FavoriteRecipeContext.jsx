import React, { createContext, useContext, useState, useEffect } from "react";

const FavoriteRecipeContext = createContext();

export const useFavoriteRecipes = () => {
  return useContext(FavoriteRecipeContext);
};

export const FavoriteRecipeProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const addFavoriteRecipe = (recipe) => {
    setFavoriteRecipes((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFavoriteRecipe = (id) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== id)
    );
  };

  return (
    <FavoriteRecipeContext.Provider
      value={{ favoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe }}
    >
      {children}
    </FavoriteRecipeContext.Provider>
  );
};
