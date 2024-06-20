import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = async (newRecipe) => {
    setIsAddLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/recipes",
        newRecipe
      );
      setRecipes([...recipes, response.data]);
      setIsAddLoading(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setIsAddLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    setIsDeleteLoading(true);
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      setIsDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setIsDeleteLoading(false);
    }
  };

  const editRecipe = async (id, updatedRecipe) => {
    setIsEditLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/recipes/${id}`,
        updatedRecipe
      );
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...response.data } : recipe
        )
      );
      setSelectedRecipe(null);
      setIsEditLoading(false);
    } catch (error) {
      console.error("Error editing recipe:", error);
      setIsEditLoading(false);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        isLoading,
        isAddLoading,
        isEditLoading,
        isDeleteLoading,
        selectedRecipe,
        addRecipe,
        deleteRecipe,
        editRecipe,
        setSelectedRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeProvider, RecipeContext };
