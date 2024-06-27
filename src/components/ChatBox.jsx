import React, { useState, useContext } from "react";
import "../assets/styles/chatBox.scss";
import { RecipeContext } from "../context/RecipeContext";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const { recipes } = useContext(RecipeContext);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    setSearchMode(false);
    setResult(null);
  };

  const handleSearchClick = () => {
    setSearchMode(true);
    setResult(null);
  };

  const handleSuggestionClick = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    setResult(randomRecipe);
    setSearchMode(false);
  };

  const handleContactClick = () => {
    setResult({
      title: "Contact Information",
      description:
        "Address: 123 Main St, Cityville, Country\nPhone: +1234567890",
    });
    setSearchMode(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const foundRecipe = recipes.find((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResult(foundRecipe || { title: "No recipes found", description: "" });
    setSearchQuery("");
    setSearchMode(false);
  };

  return (
    <div className={`chat-box ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle" onClick={toggleChatBox}>
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
      {isOpen && (
        <div className="chat-content">
          {!searchMode && (
            <div className="options">
              <button onClick={handleSearchClick}>
                What are you looking for?
              </button>
              <button onClick={handleSuggestionClick}>Suggestion</button>
              <button onClick={handleContactClick}>Contact</button>
            </div>
          )}
          {searchMode && (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                required
              />
              <button type="submit">Search</button>
            </form>
          )}
          {result && (
            <div className="result">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
