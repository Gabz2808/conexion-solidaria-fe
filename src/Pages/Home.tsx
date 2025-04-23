import React, { useState } from "react";
import Post from "../Components/UI/post";
import Stories from "../Components/UI/stories";
import CreatePost from "../Components/UI/createPost";
import usePosts from "../hooks/usePosts"; // Importando el hook usePosts

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, loading, error } = usePosts(); // Usando el hook usePosts
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  {selectedImage && (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={() => setSelectedImage(null)}
    >
      <div
        className="max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Para que no cierre el modal si hacen clic en la imagen
      >
        <img
          src={selectedImage}
          alt="Post ampliado"
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      </div>
    </div>
  )}
  
  return (
    <div className="container mx-auto p-6">
      {/* MODAL para imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Post ampliado"
              className="rounded-lg shadow-lg w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Componente de historias */}
      <Stories />

      {/* Botón para abrir el modal de creación de post */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-[#BB0A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B88A2] transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Crear Post
        </button>
      </div>

      {/* Modal para crear un nuevo post */}
      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Título de la sección de publicaciones */}
      <h1 className="text-3xl font-bold text-[#023047] mb-6 text-center">
        Publicaciones
      </h1>

      {/* Contenido principal */}
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-gray-500">Cargando publicaciones...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.idpost} // Cambiado a idpost para coincidir con la vista
              className="bg-white rounded-lg shadow-lg overflow-hidden m-4 w-full max-w-3xl"
            >
              <Post
                idpost={post.idpost} // Pasando el id del post
                titulo={post.titulo} // Pasando el título del post
                author_name={post.autor}
                urlusuario={post.urlusuario} // URL de la imagen del autor no disponible
                contenido={post.contenido}
                fechacreacion={post.fecha_post} // Cambiado a fecha_post para coincidir con la vista
                imagen={post.imagen}
                onImageClick={(url) => setSelectedImage(url)}
                likes={post.cantidad_likes} // Pasando la cantidad de likes
                comentarios={post.comentarios.map((comentario) => ({
                  ...comentario,
                  idusuario: comentario.idusuario || 0, // Asignar un valor predeterminado si falta
                }))} // Pasando los comentarios
                idautor={post.idautor} // Pasando el id del autor
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
