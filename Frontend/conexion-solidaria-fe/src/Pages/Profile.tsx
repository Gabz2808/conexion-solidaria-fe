import React from "react";
import ProfileCard, { Usuario } from "../Components/UI/profileCard";

const App: React.FC = () => {
  const usuario: Usuario = {
    idUsuario: 1,
    nombre: "Jessica",
    apellido: "Jones",
    email: "jessica.jones@example.com",
    password: "securepassword",
    fechaRegistro: "2022-08-15",
    rol: "Admin",
    estado: "Activo",
  };

  return (
    <div className="App">
      <ProfileCard usuario={usuario} />
    </div>
  );
};

export default App;
