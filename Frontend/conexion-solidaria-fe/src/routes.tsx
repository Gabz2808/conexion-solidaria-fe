import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import AuthForm from "./Pages/Login"; // Asegúrate de usar la ruta correcta para AuthForm

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <AuthForm /> },
]);

export default router;
