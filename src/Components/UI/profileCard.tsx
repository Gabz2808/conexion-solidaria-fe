import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext"; // Para acceder a la autenticación

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
  productos_totales: number;
  posts_totales: number;
  amigos_totales: number;
}

interface ProfileCardProps {
  usuario: Usuario | null | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ usuario }) => {
  const { usuario: usuarioContext } = useAuth(); // Obtener el usuario autenticado
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState<Usuario | null>(usuario || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Validar si el perfil es del usuario autenticado
  const isOwnProfile = usuario?.idusuario === usuarioContext?.idusuario;

  useEffect(() => {
    // Si no es el usuario autenticado, no se debe permitir editar
    if (!isOwnProfile) {
      setIsEditing(false);
    }
  }, [isOwnProfile]);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !usuario) return;

    try {
      const formData = new FormData();
      formData.append("imagen", file);

      const response = await fetch(`http://localhost:3000/perfilusuario/${usuario.idusuario}/imagen`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setEditedUsuario((prev) => prev && { ...prev, urlusuario: updatedUser.urlusuario });
        console.log("Imagen enviada con éxito al backend");
      } else {
        console.error("Error al enviar la imagen al backend");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  const handleSave = async () => {
    if (!editedUsuario) return;

    try {
      const response = await fetch(`http://localhost:3000/perfilusuario/${usuario.idusuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUsuario),
      });

      if (response.ok) {
        console.log("Perfil actualizado exitosamente.");
        setIsEditing(false);
      } else {
        console.error("Error al actualizar perfil.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow-xl mt-24 rounded-lg border border-[#D3D4D9]">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Estadísticas */}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">{usuario.amigos_totales}</p>
              <p className="text-[#4B88A2]">Amigos</p>
            </div>
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">{usuario.posts_totales}</p>
              <p className="text-[#4B88A2]">Posts</p>
            </div>
            <div>
              <p className="font-bold text-[#4B88A2] text-xl">{usuario.productos_totales}</p>
              <p className="text-[#4B88A2]">Productos</p>
            </div>
          </div>

          {/* Imagen de perfil */}
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-[#023047] hover:opacity-80 transition">
              <img
                src={editedUsuario?.urlusuario}
                alt="Perfil"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Botones de acción */}
          {isOwnProfile && (
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
          )}
        </div>

        {/* Detalles del perfil */}
        <div className="mt-20 text-center border-b pb-12">
          {isEditing ? (
            <div className="flex flex-col gap-4 items-center">
              <textarea
                name="biografia"
                value={editedUsuario?.biografia || ""}
                onChange={handleInputChange}
                className="w-full max-w-xl px-4 py-2 border-2 border-[#4B88A2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#023047] text-base"
                rows={4}
                placeholder="Biografía"
              />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-medium text-[#023047]">
                {usuario.nombre} {usuario.apellido}
              </h1>
              <p className="mt-8 text-[#023047]">{usuario.biografia}</p>
            </>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-12 flex flex-col justify-center">
          <div className="text-[#023047] text-center font-light lg:px-16 space-y-2">
            {isEditing ? (
              <div className="flex flex-col items-center gap-4">
                <input
                  type="text"
                  name="direccion"
                  value={editedUsuario?.direccion || ""}
                  onChange={handleInputChange}
                  className="w-full max-w-sm px-4 py-2 border-2 border-[#4B88A2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  placeholder="Dirección"
                />
                <input
                  type="text"
                  name="telefono"
                  value={editedUsuario?.telefono || ""}
                  onChange={handleInputChange}
                  className="w-full max-w-sm px-4 py-2 border-2 border-[#4B88A2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#023047]"
                  placeholder="Teléfono"
                />
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
