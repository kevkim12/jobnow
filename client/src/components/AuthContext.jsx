import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedLoginStatus = window.localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = window.localStorage.getItem('userId');
    setIsLoggedIn(storedLoginStatus);
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
  }, [userId]);

  const login = (id) => {
    window.localStorage.setItem('isLoggedIn', 'true');
    window.localStorage.setItem('userId', id);
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    window.localStorage.setItem('isLoggedIn', 'false');
    window.localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};