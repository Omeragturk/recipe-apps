import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/forms.scss";
import { RecipeContext } from "../context/RecipeContext";

const Forms = () => {
  const { addRecipe, selectedRecipe, editRecipe, recipes, setSelectedRecipe } =
    useContext(RecipeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
      if (recipe) {
        setTitle(recipe.title);
        setDescription(recipe.description);
        setImage(recipe.image);
        setSelectedRecipe(recipe);
      }
    } else {
      setTitle("");
      setDescription("");
      setImage("");
      setSelectedRecipe(null);
    }
  }, [id, recipes, setSelectedRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) return;

    setIsSubmitting(true);

    const newRecipe = {
      title,
      description,
      image,
    };

    if (id) {
      editRecipe(id, newRecipe);
    } else {
      addRecipe(newRecipe);
    }

    setTitle("");
    setDescription("");
    setImage("");
    setIsSubmitting(false);
    navigate("/");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setSelectedRecipe(null);
    navigate("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>{id ? "Edit Recipe" : "Add Recipe"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="buttons">
          <input
            type="submit"
            value={id ? "Update Recipe" : "Add Recipe"}
            disabled={isSubmitting || !title || !description || !image}
          />
          {id && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Forms;
