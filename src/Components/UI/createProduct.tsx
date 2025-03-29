import React, { useState } from "react";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>(""); // Precio como número o cadena
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>(""); // Categoría del producto

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el producto junto con la imagen
    console.log("Producto creado:", {
      name,
      description,
      price,
      image,
      category,
    });

    // Para enviar la imagen al servidor, puedes usar FormData, por ejemplo
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    if (image) formData.append("image", image);
    formData.append("category", category);

    // Aquí realizarías la petición para subir el producto
    // fetch('/api/products', { method: 'POST', body: formData });

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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              value={price}
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
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
