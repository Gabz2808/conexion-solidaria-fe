import React from "react";
import { Chats } from "../../models/Chats";

interface ChatsProps {
  chats: Chats[];
}

const ChatComponent: React.FC<ChatsProps> = ({ chats }) => {
  return (
    <div className="min-h-screen ">
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
            <div className="text-lg font-semibold text-[#023047]">
              Usuario: {chat.idUsuario2}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              Creado el: {chat.fechaCreacion.toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
