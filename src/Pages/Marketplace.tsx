import React, { useState, useEffect } from "react";
import useProductos from "../hooks/useProductos";
import useCategorias from "../hooks/useCategorias";
import CreateProduct from "../Components/UI/createProduct";

const Marketplace: React.FC = () => {
  const { productos } = useProductos(); // Usamos 'productos' en lugar de 'products'
  const { categorias } = useCategorias(); // Obtenemos las categorías correctamente desde el hook

  // Inicializamos 'selectedCategory' en "Todas"
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtramos productos por categoría seleccionada
  const filteredProducts =
    selectedCategory === "Todas"
      ? productos // Usamos 'productos' en lugar de 'products'
      : productos.filter((product) => product.categoria === selectedCategory);

  useEffect(() => {
    // Fetch posts when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-[#D3D4D9] p-6">
      <h1 className="text-3xl font-bold text-[#023047] text-center">
        Marketplace
      </h1>

      <button
        className="bg-[#BB0A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B88A2] transition"
        onClick={() => setIsModalOpen(true)}
      >
        + Agregar Producto
      </button>
      <CreateProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categorias.map((category) => category.nombre)}
      />
      <div className="mb-6 flex justify-center">
        {/* Mapeamos sobre las categorías recibidas */}
        <button
          key="Todas"
          onClick={() => setSelectedCategory("Todas")}
          className={`px-4 py-2 mx-2 rounded ${
            selectedCategory === "Todas"
              ? "bg-[#BB0A21] text-white"
              : "bg-[#4B88A2] text-white hover:bg-[#023047]"
          }`}
        >
          Todas
        </button>
        {categorias.map((category) => (
          <button
            key={category.idcategoria} // Usamos 'idcategoria' como clave
            onClick={() => setSelectedCategory(category.nombre)}
            className={`px-4 py-2 mx-2 rounded ${
              selectedCategory === category.nombre
                ? "bg-[#BB0A21] text-white"
                : "bg-[#4B88A2] text-white hover:bg-[#023047]"
            }`}
          >
            {category.nombre}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="bg-[#FFF9FB] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.imagen} // Usamos la imagen del producto
              alt={product.nombre}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-semibold text-[#023047] mb-2">
              {product.nombre}
            </h2>
            <p className="text-[#4B88A2] mb-4">{product.descripcion}</p>
            <p className="text-xl font-bold text-[#BB0A21]">
              ${product.precio}
            </p>
            <p className="text-gray-500">Vendedor: {product.nombrevendedor}</p>{" "}
            {/* Corregimos 'vendedor' a 'nombrevendedor' */}
            <p className="text-gray-500">Categoría: {product.categoria}</p>
            <p className="text-gray-500">
              Fecha de creación:{" "}
              {new Date(product.fechacreacion).toLocaleDateString()}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
