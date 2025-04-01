import { useEffect, useState } from "react";

interface GrupoData{

  idgrupo: number;
  nombre: string;
  descripcion: string;
  idusuario: number;
  fechacreacion: string; // Assuming the date is returned as a string
  imagen: string | null; // Assuming the image can be nullable
  nombre_propietario: string;
}

const useGrupos = () => {
  const [grupos, setGrupos] = useState<GrupoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrupos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/v-grupos");
        if (!response.ok) {
          throw new Error("Error al obtener los grupos");
        }
        const data = await response.json();


        if (Array.isArray(data)) {
          setGrupos(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando los grupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();
  }, []); // Empty dependency array to run only once on mount

  return { grupos, loading };
};

export default useGrupos;