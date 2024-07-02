import React, { useContext } from "react";
import { UserPreferencesContext } from "../context/UserPreferencesContext";
import "../assets/styles/settings.scss";

const Settings = () => {
  const { language, changeLanguage, theme, toggleTheme } = useContext(
    UserPreferencesContext
  );

  return (
    <div className={`settings-page ${theme}`}>
      <h2>Settings</h2>
      <div className="options">
        <div className="language-options">
          <label>Language:</label>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="theme-options">
          <label>Theme:</label>
          <button onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
