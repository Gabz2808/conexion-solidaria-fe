import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';  // Asegúrate de que esta URL es correcta

// Función para iniciar sesión
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    // Verificar si se recibió el token
    if (response.data.access_token) {
      // Almacenar el token en localStorage
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Login failed');
  }
};

// Función para cerrar sesión
export const logout = () => {
  // Eliminar el token del localStorage al cerrar sesión
  localStorage.removeItem('token');
};

// Función para obtener el token almacenado
export const getToken = () => {
  return localStorage.getItem('token');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!getToken();
};

// Función para realizar solicitudes HTTP protegidas
export const axiosProtectedRequest = async (url: string, method: string = 'GET', data: Record<string, unknown> | null = null) => {
  try {
    const token = getToken();

    // Verificar si el token existe
    if (!token) {
      throw new Error('No autenticado');
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
    console.error('Error en solicitud protegida:', error);
    throw new Error('No autorizado');
  }
};
