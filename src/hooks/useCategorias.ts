import { useEffect, useState } from "react";

interface CategoriaData{
  idcategoria: number;
  nombre: string;
}

const useCategorias = () => {
  const [categorias, setCategorias] = useState<CategoriaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/categorias");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();

        console.log("Categorías recibidas:", data);

        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando las categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, loading };
};

export default useCategorias;