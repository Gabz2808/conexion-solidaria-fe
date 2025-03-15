import React from "react";
import ChatComponent from "../Components/UI/chatComponent";
import MessageComponent from "../Components/UI/messageComponent";
import { MensajesPrivados } from "@/models/MensajesPrivados";
import { Chats } from "@/models/Chats";

const Messages: React.FC = () => {
  const chat: Chats = {
    idChat: 1,
    idUsuario1: 1,
    idUsuario2: 2,
    fechaCreacion: new Date(),
  };

  const mensajes: MensajesPrivados[] = [
    {
      idMPrivado: 1,
      idChat: 1,
      AutorID: 1,
      Contenido: "Hola, ¿cómo estás?",
      fechaCreacion: new Date(),
    },
    {
      idMPrivado: 2,
      idChat: 1,
      AutorID: 2,
      Contenido: "Hola, bien y tú?",
      fechaCreacion: new Date(),
    },
    {
      idMPrivado: 3,
      idChat: 1,
      AutorID: 1,
      Contenido: "Bien, gracias.",
      fechaCreacion: new Date(),
    },
  ];

  return (
    <div className="min-h-screen bg-[#D3D4D9] p-6 flex">
      <aside className="w-1/4 bg-white p-4 shadow-lg rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-[#023047]">Tus Chats</h2>
        <ul className="space-y-3">
          <li>
            <ChatComponent chats={[chat]} />
          </li>
        </ul>
      </aside>
      <main className="flex-1 ml-6 ">
        <div className="space-y-4 bg-white p-4 rounded-lg ">
          <MessageComponent mensajes={mensajes} />
          <div className="mt-4 flex items-center space-x-2 p-4 bg-white ">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Escribe un mensaje..."
            />
            <button className="bg-[#023047] text-white px-4 py-2 rounded-lg hover:bg-[#03506f] transition hover:scale-105 cursor:pointer">
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
