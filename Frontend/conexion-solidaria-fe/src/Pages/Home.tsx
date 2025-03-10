import React from "react";
import Post from "../Components/UI/post";

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

const Home: React.FC = () => {
  // Array de ejemplo de publicaciones
  const posts: PostData[] = [
    {
      id: 1,
      title: "Post 1",
      description: "This is the first post description.",
      date: "2025-02-28T00:00:00Z",
      author: {
        name: "John Doe",
        avatarUrl: "https://via.placeholder.com/150",
      },
      imageUrl: "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        Conexión solidaria
      </h1>
      <div className=" flex items-center justify-center h-screen">
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
    </div>
  );
};

export default Home;
