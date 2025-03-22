import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Marketplace from "./Pages/Marketplace";
import Profile from "./Pages/Profile";
import Messages from "./Pages/Messages";
import Groups from "./Pages/Groups";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/marketplace"
            element={
              <PrivateRoute>
                <Marketplace />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Componente PrivateRoute para proteger las rutas
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App; // Aquí exportamos el componente App de manera predeterminada.
