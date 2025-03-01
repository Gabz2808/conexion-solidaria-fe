import React from "react";
import MenuIcon from "../../Components/UI/menuincon"; // Icono del menú

interface MenuButtonProps {
  onMenuToggle: () => void;
  isOpen: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onMenuToggle, isOpen }) => {
  return (
    <button onClick={onMenuToggle} className="menu-button">
      <MenuIcon isOpen={isOpen} />
    </button>
  );
};

export default MenuButton;
