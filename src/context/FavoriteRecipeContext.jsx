import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const FavoriteRecipeContext = createContext(); // createContext ile context oluştur

export const FavoriteRecipeProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // AuthContext'ten user bilgisini al
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const addFavoriteRecipe = (recipe) => {
    if (user) {
      // Kullanıcı oturum açmışsa
      setFavoriteRecipes((prevFavorites) => [...prevFavorites, recipe]);
    } else {
      alert("Please login to add favorite recipes."); // Kullanıcıya giriş yapması gerektiği bilgisini ver
    }
  };

  return (
    <FavoriteRecipeContext.Provider
      value={{ favoriteRecipes, addFavoriteRecipe }}
    >
      {children}
    </FavoriteRecipeContext.Provider>
  );
};

export const useFavoriteRecipes = () => useContext(FavoriteRecipeContext); // useFavoriteRecipes hook'u ile context'i kullan
