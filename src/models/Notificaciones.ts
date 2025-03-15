export interface Notificaciones {
  idNotificacion: number;
  idUsuario: number;
  tipo: string;
  contenido: string;
  leido: boolean;
  fechacreacion: Date;
}