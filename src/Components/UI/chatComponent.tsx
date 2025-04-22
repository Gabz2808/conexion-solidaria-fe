import React from "react";
import { Chats } from "../../models/Chats";
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación

interface ChatsProps {
  chats: Chats[];
}

const ChatComponent: React.FC<ChatsProps> = ({ chats }) => {
  const { usuario } = useAuth(); // Obtener el usuario autenticado

  return (
    <div className="min-h-screen p-4">
      <ul className="space-y-4">
        {chats.map((chat) => {
          // Determinar el usuario contrario
          const usuarioContrario =
            chat.usuario1.idusuario === usuario?.idusuario
              ? chat.usuario2
              : chat.usuario1;

          return (
            <li
              key={chat.idchat}
              className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <div className="text-lg font-semibold text-[#023047]">
                Chat con: <span className="text-sky-600">{usuarioContrario.nombre}</span>
              </div>
              <div className="text-sm text-gray-600">
                Creado el: {new Date(chat.fechacreacion).toLocaleString()}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatComponent;
