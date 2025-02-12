import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "./UI/SearchBar";
import BellIcon from "./../assets/icons/bell.svg";
import UserIcon from "./../assets/icons/user.svg";
import LoginIcon from "./../assets/icons/sign-in-alt.svg";
import LogoutIcon from "./../assets/icons/exit.svg";

import "../assets/styles/Navbar.css";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Logo</Link>
      </div>
      <div className="navbar-center">
        <SearchBar />
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <img src={BellIcon} alt="Notificaciones" className="navbar-icon" />
            <img
              src={UserIcon}
              alt="Perfil de usuario"
              className="navbar-icon"
            />
            <button onClick={toggleLogin}>
              <img
                src={LogoutIcon}
                alt="Cerrar sesión"
                className="navbar-icon"
              />
            </button>
          </>
        ) : (
          <button onClick={toggleLogin}>
            <img src={LoginIcon} alt="Iniciar sesión" className="navbar-icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
