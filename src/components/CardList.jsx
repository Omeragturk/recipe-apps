import React, { useContext } from "react";
import Card from "./Card";
import { RecipeContext } from "../context/RecipeContext";
import "../assets/styles/card-list.scss";

const CardList = () => {
  const { recipes, deleteRecipe, setSelectedRecipe } =
    useContext(RecipeContext);

  return (
    <div className="card-list">
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          recipe={recipe}
          deleteRecipe={deleteRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
      ))}
    </div>
  );
};

export default CardList;
