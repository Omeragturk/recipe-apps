import React, { createContext, useState } from "react";

export const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");

  const changeLanguage = (lang) => setLanguage(lang);
  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <UserPreferencesContext.Provider
      value={{ language, changeLanguage, theme, toggleTheme }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
