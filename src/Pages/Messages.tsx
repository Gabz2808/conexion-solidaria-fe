// src/pages/Messages.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageComponent from "../Components/UI/messageComponent";
import { MensajesPrivados } from "@/models/MensajesPrivados";
import { Chats } from "@/models/Chats";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

const Messages: React.FC = () => {
  const { isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chats[]>([]);
  const [chatSeleccionado, setChatSeleccionado] = useState<Chats | null>(null);
  const [mensajes, setMensajes] = useState<MensajesPrivados[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [notificaciones, setNotificaciones] = useState<{ [chatId: number]: boolean }>({});

  useEffect(() => {
    if (!isAuthenticated || !usuario) {
      navigate("/login");
      return;
    }

    axios
      .get<Chats[]>(`http://localhost:3000/chats/user/${usuario.idusuario}`)
      .then((res) => setChats(res.data))
      .catch((err) => console.error("Error al cargar chats:", err));
  }, [isAuthenticated, usuario]);

  useEffect(() => {
    if (!chatSeleccionado) return;

    socket.emit("joinChat", chatSeleccionado.idchat);

    axios
      .get<MensajesPrivados[]>(
        `http://localhost:3000/mensajes/chat/${chatSeleccionado.idchat}`
      )
      .then((res) => setMensajes(res.data))
      .catch((err) => console.error("Error al cargar mensajes:", err));

    const handleNewMessage = (msg: MensajesPrivados) => {
      if (msg.idchat === chatSeleccionado.idchat) {
        setMensajes((prev) => [...prev, msg]);
      } else {
        setNotificaciones((prev) => ({ ...prev, [msg.idchat]: true }));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.emit("leaveChat", chatSeleccionado.idchat);
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatSeleccionado]);

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === "" || !chatSeleccionado || !usuario) return;
  
    const payload = {
      chatId: chatSeleccionado.idchat,
      mensaje: nuevoMensaje,
      usuarioId: usuario.idusuario,
    };
  
    // Emitir mensaje
    socket.emit("sendMessage", payload);
  
    // Agregar el mensaje a la lista localmente (optimista)
    setMensajes((prev) => [
      ...prev,
      {
        idmprivado: Date.now(), // ID temporal, luego lo actualizarás con el real
        idchat: chatSeleccionado.idchat,
        idusuario: usuario.idusuario,
        contenido: nuevoMensaje,
        fechacreacion: new Date().toISOString(),
      },
    ]);
  
    setNuevoMensaje("");
  };
  

  const seleccionarChat = (chat: Chats) => {
    setChatSeleccionado(chat);
    setNotificaciones((prev) => ({ ...prev, [chat.idchat]: false }));
  };

  return (
    <div className="min-h-screen bg-[#D3D4D9] p-6 flex">
      <aside className="w-1/4 bg-white p-4 shadow-lg rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-[#023047]">Tus Chats</h2>
        <ul className="space-y-3">
          {chats.map((chat) => {
            const otroUsuario =
              chat.usuario1.idusuario === usuario?.idusuario
                ? chat.usuario2
                : chat.usuario1;
            return (
              <li key={chat.idchat}>
                <button
                  onClick={() => seleccionarChat(chat)}
                  className={`flex justify-between w-full text-left p-2 rounded-lg hover:bg-blue-100 ${
                    chatSeleccionado?.idchat === chat.idchat ? "bg-blue-200" : ""
                  }`}
                >
                  <span>{otroUsuario.nombre}</span>
                  {notificaciones[chat.idchat] && (
                    <span className="text-xs text-red-600 font-bold">💬</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="flex-1 ml-6">
        {chatSeleccionado ? (
          <div className="space-y-4 bg-white p-4 rounded-lg">
            <MessageComponent
              mensajes={mensajes}
              currentUserId={usuario?.idusuario ?? 0}
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
        ) : (
          <div className="text-gray-500 mt-10 text-center">
            Selecciona un chat para comenzar a chatear.
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
