import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard, { Usuario } from "../Components/UI/profileCard";

const UserPage: React.FC = () => {
  const { idUsuario } = useParams<{ idUsuario: string }>(); // Captura el parámetro de la URL
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/vusuarios/${idUsuario}`,
          {
            method: "GET",
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

    if (idUsuario) {
      fetchUserProfile();
    }
  }, [idUsuario]);

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

export default UserPage;
