import React from "react";
import "../../index.css";
import "../../assets/styles/stories.css";

export interface Historias {
  idHistoria: number;
  titulo: string;
  contenido: string;
  autorID: number;
  fechaCreacion: Date;
  estado: string;
}

const historias: Historias[] = [
  {
    idHistoria: 1,
    titulo: "Historia 1",
    contenido: "Contenido de la historia 1",
    autorID: 101,
    fechaCreacion: new Date("2023-01-01"),
    estado: "publicado",
  },
  {
    idHistoria: 2,
    titulo: "Historia 2",
    contenido: "Contenido de la historia 2",
    autorID: 102,
    fechaCreacion: new Date("2023-02-01"),
    estado: "publicado",
  },
  // Add more historias as needed
];

const Stories: React.FC = () => {
  return (
    <div className="stories-container">
      {historias.map((historia) => (
        <div key={historia.idHistoria} className="story"></div>
      ))}
    </div>
  );
};

export default Stories;
