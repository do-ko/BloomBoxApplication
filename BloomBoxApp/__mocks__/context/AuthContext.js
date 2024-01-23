// __mocks__/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = jest.fn((login, password) => {
    setIsLoading(true);
    // Simulate setting user info
    setUserInfo({ userId: '123', username: login });
    setIsLoading(false);
  });

  const register = jest.fn();
  const logout = jest.fn(() => setUserInfo({}));

  return (
    <AuthContext.Provider value={{ splashLoading, isLoading, userInfo, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};