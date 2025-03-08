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
    <div className="p-4 max-w-2xl mx-auto">
      {" "}
      {/* Centra el contenido horizontalmente */}
      <div className="flex items-center mb-4">
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div className="ml-3">
          <h2 className="text-xl font-semibold font-medium text-sky-500">
            {author.name}
          </h2>
          <p className="text-sm flex gap-2 font-medium text-gray-600 dark:text-gray-400">
            {format(new Date(date), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={description}
          className="w-full h-56 object-cover rounded-lg"
        />
      )}
      <div className="flex justify-between mt-4">
        <button className="text-sky-500 font-medium">
          Like
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="Like"
            title="Like"
            className="w-12 h-12"
          />
        </button>

        <button className="text-sky-500 font-medium">
          Comment
          <img
            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
            alt="Comment"
            title="Comment"
            className="w-12 h-12"
          />
        </button>

        <button className="text-sky-500 font-medium">
          Share
          <img
            src="https://cdn-icons-png.flaticon.com/512/2958/2958783.png"
            alt="Share"
            title="Share"
            className="w-12 h-12"
          />
        </button>
      </div>
    </div>
  );
};

export default Post;
