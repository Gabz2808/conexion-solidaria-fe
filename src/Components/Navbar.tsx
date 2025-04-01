import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BellIcon from "./../assets/icons/bell.svg";
import UserIcon from "./../assets/icons/user.svg";
import LoginIcon from "./../assets/icons/sign-in-alt.svg";
import LogoutIcon from "./../assets/icons/exit.svg";
import Messages from "./../assets/icons/messages.svg";
import Marketplace from "./../assets/icons/shopping-cart.svg";
import Groups from "./../assets/icons/groups.svg";
import { SearchBar } from "./UI/SearchBar";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          Conexión Solidaria
        </Link>

        {/* Navegación */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/messages" className="text-white hover:text-gray-300">
              <img
                src={Messages}
                alt="Mensajes"
                className="h-6 w-6 inline-block mr-2"
              />
              Mensajes
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className="text-white hover:text-gray-300">
              <img
                src={Marketplace}
                alt="Mercado"
                className="h-6 w-6 inline-block mr-2"
              />
              Mercado
            </Link>
          </li>
          <li>
            <Link to="/groups" className="text-white hover:text-gray-300">
              <img
                src={Groups}
                alt="Grupos"
                className="h-6 w-6 inline-block mr-2"
              />
              Grupos
            </Link>
          </li>
        </ul>

        {/* Barra de búsqueda y acciones */}
        <div className="flex items-center">
          <SearchBar />
          <div className="ml-6 flex items-center">
            {isAuthenticated ? (
              <>
                {/* Notificaciones */}
                <button className="relative mr-4">
                  <img
                    src={BellIcon}
                    alt="Notificaciones"
                    className="h-6 w-6 text-white"
                  />
                </button>

                {/* Perfil */}
                <Link to="/profile" className="mr-4">
                  <img
                    src={UserIcon}
                    alt="Perfil de usuario"
                    className="h-6 w-6 text-white"
                  />
                </Link>

                {/* Cerrar sesión */}

                <Link to="login" className="mr-4" onClick={logout}>
                  <button>
                    <img
                      src={LogoutIcon}
                      alt="Cerrar sesión"
                      className="h-5 w-5 inline-block mr-2"
                    />
                  </button>
                </Link>
              </>
            ) : (
              /* Iniciar sesión */
              <Link to="/login" className="mr-4">
                <button className="bg-[#4b88a2] hover:bg-[#3a6980] text-white font-bold py-2 px-4 rounded">
                  <img
                    src={LoginIcon}
                    alt="Iniciar sesión"
                    className="h-5 w-5 inline-block mr-2"
                  />
                  Iniciar sesión
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
