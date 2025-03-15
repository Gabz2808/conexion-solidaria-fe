import React, { useState } from "react";
import Post from "../Components/UI/post";
import Stories from "../Components/UI/stories";
import CreatePost from "../Components/UI/createPost";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Array de ejemplo de publicaciones
  const posts: PostData[] = [
    {
      id: 1,
      title: "Post 1",
      description: "This is the first post description.",
      date: "2025-02-28T00:00:00Z",
      author: {
        name: "John Doe",
        avatarUrl:
          "https://imgs.search.brave.com/v2Gb7I7OqiHRVTwH6nfcmHY_Ow-ot6gkoWSYNsQAuMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlmLzE2/LzcyLzlmMTY3Mjcx/MGNiYTZiY2IwZGZk/OTMyMDFjNmQ0YzAw/LmpwZw",
      },
      imageUrl:
        "https://images.pexels.com/photos/4048672/pexels-photo-4048672.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Componente de historias */}
      <Stories />

      {/* Botón para abrir el modal */}
      <button
        className="bg-[#BB0A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B88A2] transition"
        onClick={openModal}
      >
        + Crear Post
      </button>

      {/* Modal */}
      <CreatePost isOpen={isModalOpen} onClose={closeModal} />

      <h1 className="text-2xl font-bold text-[#023047] mb-4">Publicaciones</h1>
      <div className="flex items-center justify-center h-screen">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden m-4"
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
