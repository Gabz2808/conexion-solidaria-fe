import React from "react";
import Post from "../UI/post";

// Definición del tipo para PostData, si no está definido en otro lugar
interface PostData {
  id: number;
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  imageUrl?: string;
}

// Componente para renderizar los posts
const PostList: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Post
            author={post.author}
            description={post.description}
            date={post.date}
            imageUrl={post.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
