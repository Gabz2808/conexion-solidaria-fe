import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Marketplace from "./Pages/Marketplace"; // Asegúrate de usar la ruta correcta para Marketplace
import Profile from "./Pages/Profile"; // Asegúrate de usar la ruta correcta para Marketplace
import Messages from "./Pages/Messages"; // Asegúrate de usar la ruta correcta para Marketplace

import "./App.css";
import "./index.css";
import Groups from "./Pages/Groups";

const App: React.FC = () => {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
};

export default App;
