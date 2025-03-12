import React from "react";

const Groups: React.FC = () => {
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
          {[1, 2, 3, 4, 5, 6].map((group) => (
            <div
              key={group}
              className="bg-[#FFF9FB] p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src="https://images.pexels.com/photos/31031957/pexels-photo-31031957/free-photo-of-group-of-sheep-grazing-in-a-pasture.png?auto=compress&cs=tinysrgb&w=600"
                alt="Group Cover"
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold text-[#023047] mt-3">
                Grupo {group}
              </h2>
              <p className="text-[#4B88A2]">Descripción breve del grupo.</p>
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
