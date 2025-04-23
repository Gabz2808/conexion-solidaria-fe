// models/Chats.ts
export interface Chats {
  idchat: number;
  usuario1: { idusuario: number; nombre: string };
  usuario2: { idusuario: number; nombre: string };
  fechacreacion: string;
}
