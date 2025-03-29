import React from "react";
import { format } from "date-fns";

interface PostProps {
  contenido: string;
  fechacreacion: string;
  author: {
    author_name: string;
    urlusuario: string;
  };
  imagen?: string;
}

const Post: React.FC<PostProps> = ({
  author,
  contenido,
  fechacreacion,
  imagen,
}) => {
  let formattedDate = "Fecha inválida";
  try {
    formattedDate = format(new Date(fechacreacion), "MMMM dd, yyyy");
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6">
        <img
          src={author.urlusuario || "https://via.placeholder.com/150"}
          alt={
            author.urlusuario
              ? `${author.author_name}'s avatar`
              : "Default avatar"
          }
          className="w-16 h-16 rounded-full border-4 border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-sky-500">
            {author.author_name}
          </h2>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed">{contenido}</p>
      {imagen && (
        <img
          src={imagen}
          alt={contenido || "Post image"}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
      )}
      <div className="flex justify-between mt-6">
        <button
          aria-label="Like this post"
          className="text-sky-500 font-semibold flex flex-col items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="Like"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">Like</span>
        </button>
        <button
          aria-label="Comment on this post"
          className="text-sky-500 font-semibold flex flex-col items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
            alt="Comment"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">Comment</span>
        </button>
        <button
          aria-label="Share this post"
          className="text-sky-500 font-semibold flex flex-col items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2958/2958783.png"
            alt="Share"
            className="w-8 h-8"
          />
          <span className="text-sm mt-1">Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
