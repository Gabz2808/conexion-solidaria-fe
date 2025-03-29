import React, { useEffect, useState } from "react";
import Post from "../Components/UI/post";
import Stories from "../Components/UI/stories";
import CreatePost from "../Components/UI/createPost";
import usePosts from "../hooks/usePosts"; // Importing usePosts

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts } = usePosts(); // Using usePosts hook

  useEffect(() => {
    // Fetch posts when the component mounts
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Stories />
      <button
        className="bg-[#BB0A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B88A2] transition"
        onClick={() => setIsModalOpen(true)}
      >
        + Crear Post
      </button>
      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <h1 className="text-2xl font-bold text-[#023047] mb-4">Publicaciones</h1>
      <div className="flex flex-col items-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.idposts}
              className="bg-white rounded-lg shadow-lg overflow-hidden m-4 w-full max-w-3xl"
            >
              <Post
                author={{
                  author_name: post.author_name ?? "Anónimo", // Maneja el caso null o undefined
                  urlusuario:
                    post.author_urlusuario || "https://via.placeholder.com/150",
                }}
                contenido={post.contenido}
                fechacreacion={post.fechacreacion}
                imagen={post.imagen}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
