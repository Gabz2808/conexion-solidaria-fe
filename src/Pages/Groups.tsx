import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGrupos from "../hooks/useGrupos"; // Importing useGrupos
import { useAuth } from "../context/AuthContext";
import useMiembrosGrupos from "../hooks/useMiembrosGrupos"; // Importing useMiembrosGrupos

const Groups: React.FC = () => {
  
  const { isAuthenticated } = useAuth();
  const { miembrosGrupos } = useMiembrosGrupos(); // Using useMiembrosGrupos hook
  const { grupos } = useGrupos(); // Using useGrupos hook
  useEffect(() => {}, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-[#D3D4D9] p-6 flex">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-[#FFF9FB] p-6 shadow-lg rounded-lg h-fit">
  <h2 className="text-2xl font-bold mb-5 text-[#023047]">Tus Grupos</h2>
  <nav aria-label="Lista de grupos del usuario">
    <ul className="space-y-3">
      {miembrosGrupos.length > 0 ? (
        miembrosGrupos.map((miembro, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#023047]">{miembro.nombre}</h3>
            <p className="text-[#4B88A2]">{miembro.rol}</p>

          </li>
        ))

      ) : (
        <li className="text-[#6c757d]">No perteneces a ningún grupo todavía.</li>
      )}
    </ul>
  </nav>
</aside>


      {/* Main Content */}
      <main className="flex-1 ml-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#023047]">Explorar Grupos</h1>
          <button className="bg-[#BB0A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B88A2] transition">
            + Crear Grupo
          </button>
        </div>

        {/* Groups List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grupos.map((grupo, index) => (
            <div
              key={index}
              className="bg-[#FFF9FB] p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={
                  grupo.imagen ||
                  "https://images.pexels.com/photos/31346973/pexels-photo-31346973/free-photo-of-escena-de-lago-brumoso-con-ramas-colgantes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="Group Cover"
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold text-[#023047] mt-3">
                {grupo.nombre}
              </h2>
              <p className="text-[#4B88A2]">{grupo.descripcion}</p>
              <button className="mt-3 w-full bg-[#4B88A2] text-white py-2 rounded-lg hover:bg-[#BB0A21] transition">
                Unirse
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Groups;
