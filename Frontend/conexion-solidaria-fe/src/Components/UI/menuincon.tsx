import React from "react";

interface MenuIconProps {
  isOpen: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="40"
      height="40"
      fill={isOpen ? "#FF5733" : "#023047"} // Cambia de color cuando el menú se abre
    >
      <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
      <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z" />
      <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z" />
    </svg>
  );
};

export default MenuIcon;
