import axios from "axios";

const AuthService = {
  loginService: async (email, password) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
    } catch (error) {
      throw new Error("Email or password is incorrect.");
    }
  },

  logoutService: () => {
    localStorage.removeItem("token");
  },

  getToken: () => localStorage.getItem("token"),

  isAuthenticated: () => !!localStorage.getItem("token"),

  getProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch profile.");
    }
  },
};

export default AuthService;
