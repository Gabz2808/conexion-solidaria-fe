import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Menu from "./Components/Menu";
import MenuButton from "./Components/UI/menubutton"; // Importamos el botón del menú
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      {/* Botón del menú en la parte izquierda */}
      <MenuButton
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Navbar */}
      <Navbar />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
