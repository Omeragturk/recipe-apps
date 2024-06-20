import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navi from "./components/Navi";
import CardList from "./components/CardList";
import Forms from "./components/Forms";
import Login from "./components/Login";
import { RecipeProvider } from "./context/RecipeContext";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./services/PrivateRoute";
import Settings from "./components/Settings";

const App = () => {
  return (
    <AuthContextProvider>
      <RecipeProvider>
        <Router>
          <Navi />
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/add" element={<PrivateRoute element={<Forms />} />} />
            <Route
              path="/edit/:id"
              element={<PrivateRoute element={<Forms />} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </RecipeProvider>
    </AuthContextProvider>
  );
};

export default App;
