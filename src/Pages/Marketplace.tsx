import React, { useState } from "react";

export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  vendedor: string;
  fechaCreacion: Date;
}

const products: Producto[] = [
  {
    nombre: "Product 1",
    descripcion: "Description for product 1",
    precio: 100,
    categoria: "Category 1",
    stock: 10,
    vendedor: "Vendor 1",
    fechaCreacion: new Date(),
  },
];

const categories = ["All", "Category 1", "Category 2"];

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.categoria === selectedCategory);

  return (
    <div className="min-h-screen bg-[#D3D4D9] p-6">
      <h1 className="text-4xl text-center mb-8 text-[#023047]">Marketplace</h1>
      <div className="mb-6 flex justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 mx-2 rounded ${
              selectedCategory === category
                ? "bg-[#BB0A21] text-white"
                : "bg-[#4B88A2] text-white hover:bg-[#023047]"
            }`}
          >
            {category}
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
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
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
            <p className="text-gray-500">Stock: {product.stock}</p>
            <p className="text-gray-500">Vendedor: {product.vendedor}</p>
            <p className="text-gray-500">Categoría: {product.categoria}</p>
            <p className="text-gray-500">
              Fecha de creación: {product.fechaCreacion.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
