import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../Components/UI/chatComponent";
import MessageComponent from "../Components/UI/messageComponent";
import { MensajesPrivados } from "@/models/MensajesPrivados";
import { Chats } from "@/models/Chats";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

// Conexión con el backend WebSocket
const socket = io("http://localhost:3000");

const Messages: React.FC = () => {
  const { isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const [mensajes, setMensajes] = useState<MensajesPrivados[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // Chat simulado
  const chat: Chats = {
    idchat: 1,
    usuario1: { idusuario: 1, nombre: "Juan" },
    usuario2: { idusuario: 2, nombre: "María" },
    fechacreacion: new Date().toISOString(), // <== string
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    socket.emit("joinChat", chat.idchat);

    socket.on("newMessage", (msg: MensajesPrivados) => {
      setMensajes((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [chat.idchat]);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === "") return;

    const payload = {
      chatId: chat.idchat,
      mensaje: nuevoMensaje,
      usuarioId: usuario?.idusuario || chat.usuario1.idusuario,
    };

    socket.emit("sendMessage", payload);

    setMensajes((prev) => [
      ...prev,
      {
        idMPrivado: Date.now(),
        idChat: chat.idchat,
        AutorID: payload.usuarioId,
        Contenido: payload.mensaje,
        fechaCreacion: new Date().toISOString(), // ✅ ahora es string
      },
    ]);
    

    setNuevoMensaje("");
  };

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
      <main className="flex-1 ml-6">
        <div className="space-y-4 bg-white p-4 rounded-lg">
          <MessageComponent
            mensajes={mensajes}
            currentUserId={usuario?.idusuario || chat.usuario1.idusuario} 
          />
          <div className="mt-4 flex items-center space-x-2 p-4 bg-white">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none"
              placeholder="Escribe un mensaje..."
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            />
            <button
              onClick={enviarMensaje}
              className="bg-[#023047] text-white px-4 py-2 rounded-lg hover:bg-[#03506f] transition hover:scale-105 cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
