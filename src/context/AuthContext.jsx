import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const userProfile = await AuthService.getProfile();
          setProfile(userProfile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      await AuthService.loginService(email, password);
      setIsAuthenticated(true);
      const userProfile = await AuthService.getProfile();
      setProfile(userProfile);
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error(error);
    }
  };

  const logout = () => {
    AuthService.logoutService();
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
