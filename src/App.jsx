import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navi from "./components/Navi";
import CardList from "./components/CardList";
import Forms from "./components/Forms";
import Login from "./components/Login";
import Settings from "./components/Settings";
import FavoriteRecipes from "./components/FavoriteRecipes";
import { RecipeProvider } from "./context/RecipeContext";
import { AuthContextProvider } from "./context/AuthContext";
import {
  UserPreferencesProvider,
  UserPreferencesContext,
} from "./context/UserPreferencesContext";
import { FavoriteRecipeProvider } from "./context/FavoriteRecipeContext";
import PrivateRoute from "./services/PrivateRoute";
import ChatBox from "./components/ChatBox";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(UserPreferencesContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <>{children}</>;
};

const App = () => {
  return (
    <AuthContextProvider>
      <RecipeProvider>
        <UserPreferencesProvider>
          <FavoriteRecipeProvider>
            <ThemeProvider>
              <Router>
                <Navi />
                <Routes>
                  <Route path="/" element={<CardList />} />
                  <Route
                    path="/add"
                    element={<PrivateRoute element={<Forms />} />}
                  />
                  <Route
                    path="/edit/:id"
                    element={<PrivateRoute element={<Forms />} />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/favorites"
                    element={<PrivateRoute element={<FavoriteRecipes />} />}
                  />
                </Routes>
                <ChatBox />
              </Router>
            </ThemeProvider>
          </FavoriteRecipeProvider>
        </UserPreferencesProvider>
      </RecipeProvider>
    </AuthContextProvider>
  );
};

export default App;
