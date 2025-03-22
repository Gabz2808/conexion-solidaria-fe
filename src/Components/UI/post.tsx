import React from "react";
import { format } from "date-fns";

interface PostProps {
  author: {
    name: string;
    avatarUrl?: string;
  };
  description: string;
  date: string;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({ author, description, date, imageUrl }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6">
        {/* Avatar del autor con un fallback de imagen */}
        <img
          src={author.avatarUrl || "https://via.placeholder.com/150"}
          alt={author.avatarUrl ? `${author.name}'s avatar` : "Default avatar"}
          className="w-16 h-16 rounded-full border-4 border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-sky-500">{author.name}</h2>
          {/* Fecha formateada */}
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {format(new Date(date), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed">
        {description}
      </p>
      {/* Imagen de la publicación si existe */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={description || "Post image"}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
      )}
      <div className="flex justify-between mt-6">
        {/* Botón de like */}
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

        {/* Botón de comentario */}
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

        {/* Botón de compartir */}
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
