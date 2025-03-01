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
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div className="ml-3">
          <h2 className="text-xl font-semibold text-gray-800">{author.name}</h2>
          <p className="text-sm text-gray-500">
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
    </div>
  );
};

export default Post;
