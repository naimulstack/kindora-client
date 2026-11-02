"use client";

import * as React from "react";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = React.useCallback((userData) => {
    // The user object is supplied by the authentication flow once it is
    // connected; until then it stays unset so no user data is hardcoded here.
    setUser(userData ?? null);
    setIsAuthenticated(true);
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = React.useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
