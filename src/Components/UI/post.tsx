import React, { useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext"; // Usar el contexto de autenticación

interface Comment {
  idcomentario: number;
  contenido: string;
  fecha_comentario: string;
  autor_comentario: string;
}

interface PostProps {
  titulo: string;
  contenido: string;
  fechacreacion: string;
  autor: {
    author_name: string;
    urlusuario: string;
  };
  imagen?: string;
  likes: number;
  comentarios: Comment[];
  idpost: number;
}

const Post: React.FC<PostProps> = ({
  titulo,
  contenido,
  fechacreacion,
  autor,
  imagen,
  likes,
  comentarios,
  idpost,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>(comentarios);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { usuario } = useAuth();
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    if (!usuario || !usuario.idusuario) {
      alert(
        "No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const comentarioData = {
        contenido: newComment,
        idpost,
        idusuario: usuario.idusuario,
      };

      console.log("Datos enviados al backend:", comentarioData);

      const response = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Token de autenticación
        },
        body: JSON.stringify(comentarioData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el comentario");
      }

      const savedComment = await response.json(); // Obtener el comentario guardado desde el backend

      // Agregar manualmente el nombre del autor y la fecha al comentario
      const newCommentWithDetails: Comment = {
        ...savedComment,
        autor_comentario: `${usuario.nombre} ${usuario.apellido}`, // Usa el nombre completo del usuario autenticado
        fecha_comentario: new Date().toISOString(), // Usa la fecha actual
      };

      setAllComments([newCommentWithDetails, ...allComments]); // Agregar el nuevo comentario al inicio
      setNewComment(""); // Limpiar el campo de entrada
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      alert("Hubo un error al agregar el comentario. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false); // Finalizar el estado de envío
    }
  };

  let formattedDate = "Fecha inválida";
  try {
    formattedDate = format(new Date(fechacreacion), "MMMM dd, yyyy");
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Header del post */}
      <div className="flex items-center mb-6">
        <img
          src={autor.urlusuario || "https://via.placeholder.com/150"} // Imagen de avatar genérica si no hay URL
          alt={`${autor.author_name}'s avatar`}
          className="w-16 h-16 rounded-full border-4 border-sky-500"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-sky-600 hover:underline">
            {autor.author_name}
          </h2>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Contenido del post */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h3>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed">{contenido}</p>
      {imagen && (
        <img
          src={imagen}
          alt={titulo || "Post image"}
          className="w-full h-96 object-cover rounded-xl mb-6 border border-gray-300"
        />
      )}

      {/* Botones de interacción */}
      <div className="flex justify-between mt-6">
        <button
          aria-label="Like this post"
          className="text-sky-500 font-semibold flex flex-col items-center hover:text-sky-700 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="Like"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">{likes} Likes</span>
        </button>
        <button
          aria-label="Comment on this post"
          className="text-sky-500 font-semibold flex flex-col items-center hover:text-sky-700 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
            alt="Comment"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">{allComments.length} Comments</span>
        </button>
        <button
          aria-label="Share this post"
          className="text-sky-500 font-semibold flex flex-col items-center hover:text-sky-700 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2958/2958783.png"
            alt="Share"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">Share</span>
        </button>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Comentarios</h3>

        {/* Campo para agregar un nuevo comentario */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isSubmitting} // Deshabilitar mientras se envía
          />
          <button
            onClick={handleAddComment}
            className="ml-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
            disabled={isSubmitting} // Deshabilitar mientras se envía
          >
            {isSubmitting ? "Enviando..." : "Comentar"}
          </button>
        </div>

        {/* Lista de comentarios */}
        {allComments.length > 0 ? (
          allComments.map((comentario) => (
            <div
              key={comentario.idcomentario}
              className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <p className="text-gray-800">
                <span className="font-bold text-sky-600">
                  {comentario.autor_comentario}:
                </span>{" "}
                {comentario.contenido}
              </p>
              <p className="text-sm text-gray-500">
                {comentario.fecha_comentario
                  ? format(
                      new Date(comentario.fecha_comentario),
                      "MMMM dd, yyyy"
                    )
                  : "Fecha no disponible"}{" "}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        )}
      </div>
    </div>
  );
};

export default Post;
