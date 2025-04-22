import { useEffect, useState } from "react";
import { MiembrosGrupo } from "@/models/MiembrosGrupo";
import { useAuth } from "../context/AuthContext"; // Importa el hook personalizado

const useMiembrosGrupos = () => {
  const { usuario: usuarioContext } = useAuth(); // Obtén el usuario desde el contexto
  const [miembrosGrupos, setMiembrosGrupos] = useState<MiembrosGrupo[]>([]); // Estado para almacenar los miembros de los grupos
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando

  useEffect(() => {
    const fetchMiembrosGrupos = async () => {
      setLoading(true);
      try {
        if (!usuarioContext) {
          console.error("El usuario no está disponible en el contexto");
          setLoading(false);
          return;
        }
        const response = await fetch(`http://localhost:3000/v-miembrosgrupos/id/${usuarioContext.idusuario}`); // URL del endpoint
        if (!response.ok) {
          throw new Error("Error al obtener los miembros de los grupos");
        }
        const data: MiembrosGrupo[] = await response.json(); // Especificar el tipo de los datos

        // Validar que los datos sean un array
        if (Array.isArray(data)) {
          setMiembrosGrupos(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando los miembros de los grupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMiembrosGrupos();
  }, []); // Empty dependency array to run only once on mount

  return { miembrosGrupos, loading }; // Retornar los estados para que puedan ser utilizados

}

export default useMiembrosGrupos;