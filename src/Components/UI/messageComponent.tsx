import React from "react";
import { MensajesPrivados } from "@/models/MensajesPrivados";

export interface MensajesPrivadosProps {
  mensajes: MensajesPrivados[];
  currentUserId: number;
}

const MessageComponent: React.FC<MensajesPrivadosProps> = ({
  mensajes,
  currentUserId,
}) => {
  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto">
      {mensajes.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg max-w-[75%] break-words ${
            msg.idusuario === currentUserId
              ? "bg-blue-100 text-right ml-auto"
              : "bg-gray-200 text-left mr-auto"
          }`}
        >
          <p>{msg.contenido}</p>
          <small className="text-xs text-gray-500">
            {new Date(msg.fechacreacion).toLocaleTimeString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageComponent;
