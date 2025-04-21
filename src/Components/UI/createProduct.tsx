import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importa el hook personalizado

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[]; // Agregamos las categorías disponibles
}

const CreateProduct: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
    const { usuario: usuarioContext } = useAuth(); // Obtén el usuario desde el contexto

  const [nombre, setName] = useState("");
  const [descripcion, setDescription] = useState("");
  const [precio, setPrice] = useState<number | string>(""); // Precio como número o cadena
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>(""); // Categoría del producto

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Para enviar la imagen al servidor, puedes usar FormData, por ejemplo
    const formData = new FormData();

    if (usuarioContext && usuarioContext.idusuario !== undefined) {
      formData.append("idusuario", String(usuarioContext.idusuario)); // Cambia esto por el ID del usuario autenticado
    } else {
      console.error("El usuario no está autenticado o falta el ID del usuario.");
      return;
    }
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio.toString());
    if (image) formData.append("imagen", image);
    formData.append("categoria", category);
    const selectedCategory = categories.find((cat) => cat === category);
    if (selectedCategory) {
      formData.append("idcategoria", String(categories.indexOf(selectedCategory) + 1)); // Enviar el ID de la categoría
    } else {
      console.error("Categoría seleccionada no válida.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: formData, // Enviar FormData
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Error al crear el producto");
        return;
      }

      const data = await response.json();
      console.log("Producto creado exitosamente", data);
    } catch (error) {
      console.error("Error al enviar el producto:", error);
    }

    onClose(); // Cierra el modal después de enviar
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
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

        {/* Formulario de creación de producto */}
        <h2 className="text-xl font-bold mb-4">Crear un nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo para seleccionar categoría */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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

          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

