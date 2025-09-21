import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data.user))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/register", { name, email, password });
    setUser(data.user);
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
