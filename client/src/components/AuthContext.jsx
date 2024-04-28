// Worked on by Kevin Kim

import { createContext, useContext, useEffect, useState } from 'react';

// Creates a new context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // States to track login status and track user ID
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Loads login status and user ID from local storage
    const storedLoginStatus = window.localStorage.getItem("isLoggedIn") === "true";
    const storedUserId = window.localStorage.getItem("userId");
    setIsLoggedIn(storedLoginStatus);
    setUserId(storedUserId);
  }, []);

  // Performs necessary actions when the user ID changes
  useEffect(() => {
  }, [userId]);

  // When the login status changes, updates the local storage with user ID and login status
  const login = (id) => {
    window.localStorage.setItem("isLoggedIn", "true");
    window.localStorage.setItem("userId", id);
    setIsLoggedIn(true);
    setUserId(id);
  };

  // Updates login status and user ID in the local storage and sets the state
  const logout = () => {
    window.localStorage.setItem("isLoggedIn", "false");
    window.localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    // Provides the AuthContext to its children
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};