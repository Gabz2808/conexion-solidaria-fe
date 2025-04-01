import { useEffect, useState } from "react";
import { Chats } from "../models/Chats";

const useChats = () => {
  const [chats, setChats] = useState<Chats[]>([]); // Estado para almacenar los chats
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/v-chats"); // URL del endpoint
        if (!response.ok) {
          throw new Error("Error al obtener los chats");
        }
        const data: Chats[] = await response.json(); // Especificar el tipo de los datos

        // Validar que los datos sean un array
        if (Array.isArray(data)) {
          setChats(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando los chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }
  
  )

  return { chats, loading }; // Retornar los estados para que puedan ser utilizados
}
export default useChats;