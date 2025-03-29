import { useEffect, useState } from 'react';


interface PostData {
  idposts: number;
  contenido: string;
  fechacreacion: string;
  author_name: string | null;
  author_urlusuario: string;
  imagen?: string;
}

const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/v-posts");
        if (!response.ok) {
          throw new Error("Error al obtener los posts");
        }
        const data = await response.json();

        console.log("Posts recibidos:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Los datos no están en el formato esperado");
        }
      } catch (error) {
        console.error("Error cargando los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  return { posts, loading };
};

export default usePosts;
