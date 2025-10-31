import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/me");
        console.log("Auth check response:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/register", { name, email, password });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  const uploadAvatar = async (file) => {
    const form = new FormData();
    form.append("avatar", file);
    const { data } = await api.post("/upload_avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser((u) => ({ ...u, avatar_url: data.avatar_url }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, uploadAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
