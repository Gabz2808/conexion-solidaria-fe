import axios from "axios";

const API_URL = "http://localhost:3000/auth"; // Asegúrate de que esta URL es correcta

// Función para iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Verificar si se recibió el token
    if (response.data.access_token) {
      // Almacenar el token en localStorage
      localStorage.setItem("access_token", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error("Login failed");
  }
};

// Función para cerrar sesión
export const logout = () => {
  // Eliminar el token del localStorage al cerrar sesión
  localStorage.removeItem("access_token");
};

// Función para realizar solicitudes HTTP protegidas
export const axiosProtectedRequest = async (
  url: string,
  method: string = "GET",
  data: Record<string, unknown> | null = null
) => {
  try {
    const token = localStorage.getItem("access_token");

    // Verificar si el token existe
    if (!token) {
      throw new Error("No autenticado");
    }

    // Configurar la cabecera Authorization con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realizar la solicitud usando axios con el token
    const response = await axios({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error("Error en solicitud protegida:", error);
    throw new Error("No autorizado");
  }
};