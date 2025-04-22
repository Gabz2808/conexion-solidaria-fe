// messageComponent.tsx

import React from "react";
import { MensajesPrivados } from "@/models/MensajesPrivados";

export interface MensajesPrivadosProps {
  mensajes: MensajesPrivados[];
  currentUserId: number; // <-- esta línea es necesaria
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
          className={`p-2 rounded-lg ${
            msg.AutorID === currentUserId ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
          }`}
        >
          <p>{msg.Contenido}</p>
          <small className="text-xs text-gray-500">
            {new Date(msg.fechaCreacion).toLocaleTimeString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageComponent;
