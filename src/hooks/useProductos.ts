import { useEffect, useState } from 'react';


interface ProductoData {
  idproducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  nombrevendedor: string;
  categoria: string;
  imagen: string;
  fechacreacion: string;
}

const useProductos = () => {
  const [productos, setProductos] = useState<ProductoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproductos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/vproductos");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();

        console.log("productos recibidos:", data);

        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando los productos:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchproductos();
  }, []);

  return { productos, loading };
};

export default useProductos;
