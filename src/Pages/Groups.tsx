import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGrupos from "../hooks/useGrupos"; // Importing useGrupos
import { useAuth } from "../context/AuthContext";

const Groups: React.FC = () => {
  const { isAuthenticated } = useAuth();

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
      <aside className="w-1/4 bg-[#FFF9FB] p-4 shadow-lg rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-[#023047]">Tus Grupos</h2>
        <ul className="space-y-3">
          <li className="p-2 bg-[#4B88A2] text-white rounded cursor-pointer hover:bg-[#023047]">
            Grupo 1
          </li>
          <li className="p-2 bg-[#4B88A2] text-white rounded cursor-pointer hover:bg-[#023047]">
            Grupo 2
          </li>
          <li className="p-2 bg-[#4B88A2] text-white rounded cursor-pointer hover:bg-[#023047]">
            Grupo 3
          </li>
        </ul>
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
