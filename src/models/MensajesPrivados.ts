export interface MensajesPrivados {
  idMPrivado: number;
  idChat: number;
  AutorID: number;
  Contenido: string;
  fechaCreacion: string; // Usamos string porque lo manejas así desde la API y en el componente
}
