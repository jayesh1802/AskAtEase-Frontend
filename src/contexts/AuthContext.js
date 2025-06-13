import { createContext, useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import {jwtDecode} from "jwt-decode"; // Correct import for ES Module

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken && savedToken.split(".").length === 3 ? savedToken : null;
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.sub, role: decoded.role });
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/generate-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();

      if (!data.token || data.token.split(".").length !== 3) {
        throw new Error("Invalid token received from server");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      return true;
    } catch (err) {
      alert("Login failed: " + err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
