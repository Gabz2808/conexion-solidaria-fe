import { Link } from "react-router-dom";
import { SearchBar } from "./UI/SearchBar";
import BellIcon from "./../assets/icons/bell.svg";
import LoginIcon from "./../assets/icons/sign-in-alt.svg";

import "../assets/styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Logo</Link>
        </li>
        <li>
          <SearchBar />
        </li>

        <li>
          <img src={BellIcon} alt="Notificaciones" className="navbar-icon" />
        </li>
        <li>
          <img src={LoginIcon} alt="Login" className="navbar-icon" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
