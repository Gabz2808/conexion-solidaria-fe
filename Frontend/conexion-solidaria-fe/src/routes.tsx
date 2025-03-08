import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import AuthForm from "./Pages/Login"; // Asegúrate de usar la ruta correcta para AuthForm
import Marketplace from "./Pages/Marketplace"; // Asegúrate de usar la ruta correcta para Marketplace

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/marketplace", element: <Marketplace /> },
]);

export default router;
