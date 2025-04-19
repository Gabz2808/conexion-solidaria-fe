import React, { useState } from "react";
import { format } from "date-fns";

export interface Usuario {
  idperfilusuario: number;
  direccion: string;
  telefono: string;
  urlusuario: string;
  biografia: string;
  idusuario: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fecharegistro: Date;
  rol: string;
  estado: string;
}

interface ProfileCardProps {
  usuario: Usuario | null | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ usuario }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState<Usuario | null>(usuario || null);

  if (!usuario) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  const formattedDate = usuario.fecharegistro
    ? format(new Date(usuario.fecharegistro), "dd/MM/yyyy")
    : "Fecha no disponible";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedUsuario) {
      setEditedUsuario({
        ...editedUsuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar los cambios (e.g., enviar a una API)
    console.log("Datos guardados:", editedUsuario);
    setIsEditing(false);
  };

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow-xl mt-24 rounded-lg border border-[#D3D4D9]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Estadísticas */}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">22</p>
              <p className="text-[#4B88A2]">Amigos</p>
            </div>
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">10</p>
              <p className="text-[#4B88A2]">Fotos</p>
            </div>
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">89</p>
              <p className="text-[#4B88A2]">Comentarios</p>
            </div>
          </div>
          {/* Imagen de perfil */}
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-[#023047]">
             <img
                  src={usuario.urlusuario}
                  alt="Perfil"
                  className="w-full h-full rounded-full object-cover"
                />
              
            </div>
          </div>
          {/* Botones de acción */}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-[#BB0A21] hover:bg-[#023047] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>
            {isEditing && (
              <button
                className="text-white py-2 px-4 uppercase rounded bg-[#4B88A2] hover:bg-[#023047] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={handleSave}
              >
                Guardar
              </button>
            )}
          </div>
        </div>

        {/* Detalles del perfil */}
        <div className="mt-20 text-center border-b pb-12">
          {isEditing ? (
            <>
              <input
                type="text"
                name="nombre"
                value={editedUsuario?.nombre || ""}
                onChange={handleInputChange}
                className="text-4xl font-medium text-[#023047] border-b"
              />
              <input
                type="text"
                name="apellido"
                value={editedUsuario?.apellido || ""}
                onChange={handleInputChange}
                className="text-4xl font-medium text-[#023047] border-b"
              />
              <textarea
                name="biografia"
                value={editedUsuario?.biografia || ""}
                onChange={handleInputChange}
                className="mt-8 text-[#023047] border"
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-medium text-[#023047]">
                {usuario.nombre} {usuario.apellido},{" "}
                <span className="font-light text-[#4B88A2]">27</span>
              </h1>
              <p className="mt-8 text-[#023047]">{usuario.biografia}</p>
            </>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-12 flex flex-col justify-center">
          <div className="text-[#023047] text-center font-light lg:px-16">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="direccion"
                  value={editedUsuario?.direccion || ""}
                  onChange={handleInputChange}
                  className="border-b"
                />
                <input
                  type="text"
                  name="telefono"
                  value={editedUsuario?.telefono || ""}
                  onChange={handleInputChange}
                  className="border-b"
                />
              </>
            ) : (
              <>
                <p>{usuario.direccion}</p>
                <p>{usuario.telefono}</p>
              </>
            )}
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Fecha de Registro:</strong> {formattedDate}
            </p>
            <p>
              <strong>Rol:</strong> {usuario.rol}
            </p>
            <p>
              <strong>Estado:</strong> {usuario.estado}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
