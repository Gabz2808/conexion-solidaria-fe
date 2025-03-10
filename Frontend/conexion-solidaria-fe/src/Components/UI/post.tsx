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
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6">
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-16 h-16 rounded-full border-4 border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-sky-500">{author.name}</h2>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {format(new Date(date), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed">
        {description}
      </p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={description}
          className="w-full h-96 object-cover rounded-xl"
        />
      )}
      <div className="flex justify-between mt-6">
        <button className="text-sky-500 font-semibold flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="Like"
            title="Like"
            className="w-8 h-8"
          />
        </button>

        <button className="text-sky-500 font-semibold flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
            alt="Comment"
            title="Comment"
            className="w-8 h-8"
          />
        </button>

        <button className="text-sky-500 font-semibold flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2958/2958783.png"
            alt="Share"
            title="Share"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default Post;
