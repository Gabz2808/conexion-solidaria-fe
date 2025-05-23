import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importa el hook personalizado
import { redirect } from "react-router-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePost: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { usuario: usuarioContext } = useAuth(); // Obtén el usuario desde el contexto

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("contenido", description);
    if (usuarioContext && usuarioContext.idusuario !== undefined) {
      formData.append("idusuario", String(usuarioContext.idusuario)); // Cambia esto por el ID del usuario autenticado
    } else {
      console.error("El usuario no está autenticado o falta el ID del usuario.");
      return;
    }
    if (image) {
      formData.append("image", image); // Agrega la imagen al FormData
    }

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData, // Enviar FormData
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Error al crear el post");
        return;
      }

      const data = await response.json();
      console.log("Post creado exitosamente", data);
    } catch (error) {
      console.error("Error al enviar el post:", error);
    }

    redirect("/"); // Redirigir a la página de posts después de crear el post
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-1/3"
        onClick={(e) => e.stopPropagation()} // Para evitar que el modal se cierre si se hace clic en el contenido
      >
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>

        {/* Formulario de creación de post */}
        <h2 className="text-xl font-bold mb-4">Crear un nuevo post</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              
            />
          </div>

          {/* Campo para adjuntar imagen */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen (opcional)
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Imagen previsualizada"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Crear Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;