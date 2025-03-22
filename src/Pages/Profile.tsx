import React, { useState, useEffect } from "react";
import ProfileCard, { Usuario } from "../Components/UI/profileCard";

const App: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsuario(data);
          } else {
            setError("No se pudo obtener los datos del usuario.");
          }
        } catch {
          setError("Hubo un error al obtener los datos del usuario.");
        }
      } else {
        setError("No hay token de acceso.");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!usuario) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="App">
      <ProfileCard usuario={usuario} />
    </div>
  );
};

export default App;
