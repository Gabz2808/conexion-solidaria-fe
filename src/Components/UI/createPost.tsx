import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePost: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  if (!isOpen) return null;

  // Removed duplicate handleSubmit function to avoid redeclaration error.

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {title, description, image};
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json();
      console.error(data.message || "Error al crear el post");
      return;
    }
    const data = await response.json();
      console.log("Post creado exitosamente", data);
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
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
              required
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