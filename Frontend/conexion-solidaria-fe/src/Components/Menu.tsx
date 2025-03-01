import { Link } from "react-router-dom";
import Messages from "../assets/icons/messages.svg";
import Marketplace from "../assets/icons/shopping-cart.svg";
import Groups from "../assets/icons/groups.svg";
import "../assets/styles/Menu.css";
import "../assets/styles/global.css";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <div className="menu-overlay" onClick={onClose}></div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/messages" onClick={onClose}>
              <img src={Messages} alt="Mensajes" className="navbar-icon" />
              Mensajes
            </Link>
          </li>
          <li>
            <Link to="/marketplace" onClick={onClose}>
              <img src={Marketplace} alt="Mercado" className="navbar-icon" />
              Mercado
            </Link>
          </li>
          <li>
            <Link to="/groups" onClick={onClose}>
              <img src={Groups} alt="Grupos" className="navbar-icon" />
              Grupos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
