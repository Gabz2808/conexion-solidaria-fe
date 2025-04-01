import { useEffect, useState } from "react";

interface Comentario {
  idcomentario: number; // ID del comentario
  contenido: string; // Contenido del comentario
  fecha_comentario: string; // Fecha de creación del comentario
  autor_comentario: string; // Nombre completo del autor del comentario
}

interface PostData {
  idpost: number; // ID del post
  titulo: string; // Título del post
  contenido: string; // Contenido del post
  fecha_post: string; // Fecha de creación del post
  imagen?: string; // URL de la imagen del post (opcional)
  autor: string; // Nombre completo del autor
  cantidad_likes: number; // Número de likes
  comentarios: Comentario[]; // Lista de comentarios
}

const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]); // Estado para almacenar los posts
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null); // Reiniciar el estado de error antes de la solicitud
      try {
        const response = await fetch("http://localhost:3000/v-posts"); // URL del endpoint
        if (!response.ok) {
          throw new Error(`Error al obtener los posts: ${response.statusText}`);
        }
        const data: PostData[] = await response.json(); // Especificar el tipo de los datos

        // Validar que los datos sean un array
        if (Array.isArray(data)) {
          // Mapear los datos para asegurarnos de que coincidan con la estructura esperada
          const formattedData = data.map((post) => ({
            idpost: post.idpost,
            titulo: post.titulo,
            contenido: post.contenido,
            fecha_post: post.fecha_post,
            imagen: post.imagen || undefined,
            autor: post.autor,
            cantidad_likes: post.cantidad_likes,
            comentarios: Array.isArray(post.comentarios)
              ? post.comentarios.map((comentario) => ({
                  idcomentario: comentario.idcomentario,
                  contenido: comentario.contenido,
                  fecha_comentario: comentario.fecha_comentario,
                  autor_comentario: comentario.autor_comentario,
                }))
              : [], // Si no hay comentarios, devolver un array vacío
          }));
          setPosts(formattedData);
        } else {
          throw new Error("Los datos no están en el formato esperado");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Error desconocido");
          console.error("Error cargando los posts:", error);
        } else {
          setError("Error desconocido");
          console.error("Error cargando los posts:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default usePosts;