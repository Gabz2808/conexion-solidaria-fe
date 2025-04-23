import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard, { Usuario } from "../Components/UI/profileCard";
import { useAuth } from "../context/AuthContext"; // Para acceder a la autenticación

const UserPage: React.FC = () => {
  const { idUsuario } = useParams<{ idUsuario: string }>(); // Captura el parámetro de la URL
  const { usuario: usuarioContext } = useAuth(); // Obtiene el usuario autenticado desde el contexto
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false); // Para verificar si son amigos
  const [activeTab, setActiveTab] = useState<string>("posts"); // Para manejar la pestaña activa
  const [contenidoFiltrado, setContenidoFiltrado] = useState<any[]>([]);
  const endpoint =
  activeTab === "posts"
    ? `http://localhost:3000/v-posts/id/${idUsuario}`
    : `http://localhost:3000/productos/${idUsuario}`;


  // Función para enviar solicitud de amistad
  const handleSendFriendRequest = async () => {
    if (!usuarioContext?.idusuario) {
      setError("Necesitas estar autenticado para enviar una solicitud.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/amigos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        
        body: JSON.stringify({
          idusuario1: usuarioContext.idusuario,
          idusuario2: usuario?.idusuario,
          estado: "pendiente",
          fechasolicitud: new Date().toISOString(), // Fecha actual
        }),
      });

      if (response.ok) {
        setIsFriend(true); // Suponemos que la solicitud fue enviada con éxito
      } else {
        setError("No se pudo enviar la solicitud de amistad.");
      }
    } catch {
      setError("Ocurrió un error al intentar enviar la solicitud.");
    }
  };

  // Función para enviar un mensaje
  const handleSendMessage = async () => {
    if (!usuarioContext?.idusuario) {
      setError("Necesitas estar autenticado para enviar un mensaje.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          usuario1: usuarioContext.idusuario,
          usuario2: usuario?.idusuario,

   
          fechacreacion: new Date().toISOString(), // Fecha actual
        }),
      });

      if (response.ok) {
        console.log("Chat creado");
        window.location.href = "/messages";
      } else {
        setError("No se pudo craer el chat.");
      }
    } catch {
      setError("Ocurrió un error al intentar crear el chat.");
    }
    console.log(`Enviar mensaje a ${usuario?.nombre}`);

  };

  // Fetch del perfil de usuario
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
  },[idUsuario]);

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setContenidoFiltrado(data);
        } else {
          setError("No se pudo obtener el contenido del usuario.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      }
    };
  
    if (idUsuario) {
      fetchContenido();
    }
  }, [endpoint, idUsuario]);
  


  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!usuario) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="App">


      <ProfileCard usuario={usuario} />

      {/* Acciones para interactuar con el perfil */}
      {usuarioContext && usuarioContext.idusuario !== usuario.idusuario && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Enviar mensaje
          </button>

          {!isFriend && (
            <button
              onClick={handleSendFriendRequest}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Enviar solicitud de amistad
            </button>
          )}

          {isFriend && (
            <span className="text-green-500">¡Ya son amigos!</span>
          )}
        </div>
      )}

      {/* Botones de filtro */}
<div className="flex justify-center gap-4 mt-10 mb-6">
  <button
    className={`px-4 py-2 rounded-lg transition ${
      activeTab === "posts"
        ? "bg-[#023047] text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
    onClick={() => setActiveTab("posts")}
  >
    Posts
  </button>
  <button
    className={`px-4 py-2 rounded-lg transition ${
      activeTab === "post"
        ? "bg-[#023047] text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
    onClick={() => setActiveTab("productos")}
  >
    Productos
  </button>
</div>

      <div className="mt-6 px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {contenidoFiltrado.length > 0 ? (
      contenidoFiltrado.map((item, index) => (
        <div key={index} className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#023047]">
            {item.titulo || item.nombre || "Sin título"}
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            {item.contenido || item.descripcion || "Sin descripción"}
          </p>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500">
        No hay contenido para mostrar.
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default UserPage;
  