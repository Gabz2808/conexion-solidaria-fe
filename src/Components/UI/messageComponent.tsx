import React from "react";
import { MensajesPrivados } from "@/models/MensajesPrivados";

interface MensajesPrivadosProps {
  mensajes: MensajesPrivados[];
}

const MessageComponent: React.FC<MensajesPrivadosProps> = ({ mensajes }) => {
  return (
    <div className="min-h-screen p-4">
      <ul className="space-y-4">
        {mensajes.map((mensaje) => (
          <li
            key={mensaje.idMPrivado}
            className={`flex ${
              mensaje.AutorID === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 max-w-xs rounded-lg shadow-md text-white ${
                mensaje.AutorID === 1
                  ? "bg-[#023047] text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              <div className="text-sm font-semibold">{mensaje.AutorID}</div>
              <div className="text-lg font-semibold">{mensaje.Contenido}</div>
              <div className="text-xs text-gray-200 mt-1">
                {mensaje.fechaCreacion.toLocaleDateString()}{" "}
                {mensaje.fechaCreacion.toLocaleTimeString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;
