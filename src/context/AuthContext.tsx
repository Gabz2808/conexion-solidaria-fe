// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { Usuario } from "../models/Usuario"; // Ajusta la ruta según donde hayas guardado el archivo

// Definir el tipo de datos del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  usuario: Usuario | null; // Asegúrate de incluir esta propiedad
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/perfilusuario/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUsuario(data);
      } else {
        setIsAuthenticated(false);
        setUsuario(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUsuario(null);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    fetchUserProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
