export interface Usuario {
  idusuario: number;
  nombre: string;
}

export interface Chats {
  idchat: number;
  usuario1: Usuario;
  usuario2: Usuario;
  fechacreacion: string; // debe ser string, no Date
}
