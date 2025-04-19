import React, { createContext, useState, useEffect, useContext } from "react";
import { Usuario } from "../models/Usuario";

interface AuthContextType {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
      startTokenRefreshInterval(); // Inicia el intervalo para renovar el token
    } else {
      setIsAuthenticated(false);
    }

    return () => {
      stopTokenRefreshInterval(); // Limpia el intervalo al desmontar
    };
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const usuarioConId = { ...data, idusuario: data.sub };
        setUsuario(usuarioConId);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      handleLogout();
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No se encontró el refresh token.");
      }

      const response = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        console.log("Token renovado exitosamente.");
      } else {
        console.warn("No se pudo renovar el token. Cerrando sesión...");
        handleLogout();
      }
    } catch (error) {
      console.error("Error al renovar el token:", error);
      handleLogout();
    }
  };

  const startTokenRefreshInterval = () => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // Renueva el token cada 15 minutos
    localStorage.setItem("token_refresh_interval", interval.toString());
  };

  const stopTokenRefreshInterval = () => {
    const interval = localStorage.getItem("token_refresh_interval");
    if (interval) {
      clearInterval(parseInt(interval, 10));
      localStorage.removeItem("token_refresh_interval");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      const token = data.access_token;
      const refreshToken = data.refresh_token;

      if (token && refreshToken) {
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);
        await fetchUserProfile(token);
        startTokenRefreshInterval(); // Inicia el intervalo para renovar el token
      }
    } catch (error) {
      console.error("Error al iniciar sesión desde el contexto:", error);
      throw error;
    }
  };

  const logout = () => {
    handleLogout();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    stopTokenRefreshInterval();
    setIsAuthenticated(false);
    setUsuario(null);
    console.info("Sesión cerrada correctamente.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};