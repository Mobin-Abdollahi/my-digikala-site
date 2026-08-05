/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (nextUser: Omit<User, "id"> | User) => void;
  logout: () => void;
};

const AUTH_KEY = "digikala-auth-user";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);

    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser) as Partial<User>;

      if (!parsedUser.name || !parsedUser.phone) {
        localStorage.removeItem(AUTH_KEY);
        return;
      }

      const normalizedUser: User = {
        id: parsedUser.id ?? crypto.randomUUID(),
        name: parsedUser.name,
        phone: parsedUser.phone,
      };

      setUser(normalizedUser);
      localStorage.setItem(AUTH_KEY, JSON.stringify(normalizedUser));
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const login = (nextUser: Omit<User, "id"> | User) => {
    const normalizedUser: User = {
      id: "id" in nextUser && nextUser.id ? nextUser.id : crypto.randomUUID(),
      name: nextUser.name,
      phone: nextUser.phone,
    };

    setUser(normalizedUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
