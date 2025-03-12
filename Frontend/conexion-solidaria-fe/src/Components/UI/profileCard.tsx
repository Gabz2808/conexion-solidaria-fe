import React from "react";

export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaRegistro: string;
  rol: string;
  estado: string;
}

interface ProfileCardProps {
  usuario: Usuario | null | undefined; // Permitir que usuario sea null o undefined
}

const ProfileCard: React.FC<ProfileCardProps> = ({ usuario }) => {
  if (!usuario) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="p-16 bg-[#FFF9FB]">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-[#023047]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* Botones de acción */}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-[#4B88A2] hover:bg-[#023047] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Conectar
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-[#BB0A21] hover:bg-[#023047] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Mensaje
            </button>
          </div>
        </div>

        {/* Detalles del perfil */}
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-[#023047]">
            {usuario.nombre} {usuario.apellido},{" "}
            <span className="font-light text-[#4B88A2]">27</span>
          </h1>
          <p className="font-light text-[#4B88A2] mt-3">Bucharest, Romania</p>
          <p className="mt-8 text-[#023047]">
            Solution Manager - Creative Tim Officer
          </p>
          <p className="mt-2 text-[#023047]">University of Computer Science</p>
        </div>

        {/* Información adicional */}
        <div className="mt-12 flex flex-col justify-center">
          <div className="text-[#023047] text-center font-light lg:px-16">
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Fecha de Registro:</strong> {usuario.fechaRegistro}
            </p>
            <p>
              <strong>Rol:</strong> {usuario.rol}
            </p>
            <p>
              <strong>Estado:</strong> {usuario.estado}
            </p>
          </div>
          <button className="text-[#4B88A2] py-2 px-4 font-medium mt-4">
            Mostrar más
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
