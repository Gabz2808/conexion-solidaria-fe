import React, { useState, useEffect } from "react";
import ProfileCard, { Usuario } from "../Components/UI/profileCard";
import { useAuth } from "../Context/AuthContext"; // Importa el hook personalizado

const App: React.FC = () => {
  const { usuario: usuarioContext } = useAuth(); // Obtén el usuario desde el contexto
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!usuarioContext?.idusuario) {
        setError("No se encontró un usuario autenticado.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/vusuarios/${usuarioContext.idusuario}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Incluye el token en la cabecera
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          setError("No se pudo obtener los datos del usuario.");
        }
      } catch {
        setError("Ocurrió un error al conectar con el servidor.");
      }
    };

    fetchUserProfile();
  }, [usuarioContext]);

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