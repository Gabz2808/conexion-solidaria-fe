import React, { createContext, useState, useEffect, useContext } from "react";
import { Usuario } from "../models/Usuario"; // Ajusta la ruta según donde hayas guardado el archivo

// Definir el tipo de datos del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setIsAuthenticated(false);
    }
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
        const usuarioConId = { ...data, idusuario: data.sub }; // Mapear `sub` a `idusuario`
        console.log("Perfil del usuario:", usuarioConId); // Verificar que `idusuario` esté presente
        setUsuario(usuarioConId); // Actualiza el perfil del usuario
        setIsAuthenticated(true);
      } else {
        console.warn("Token inválido o expirado. Cerrando sesión...");
        handleLogout();
      }
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      handleLogout();
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

      if (token) {
        localStorage.setItem("access_token", token);
        await fetchUserProfile(token); // Obtén el perfil del usuario
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
    setIsAuthenticated(false);
    setUsuario(null);
    console.info("Sesión cerrada correctamente.");
  };
  console.log("Usuario autenticado:", usuario?.idusuario); // Verifica que `usuario` contenga `idusuario`
  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
