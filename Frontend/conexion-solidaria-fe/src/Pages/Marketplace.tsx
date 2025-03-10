import React from "react";
import { Producto } from "../models/producto";

const ProductCard: React.FC<Producto> = ({
  nombre,
  descripcion,
  precio,
  categoria,
  stock,
  vendedor,
  fechaCreacion,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{nombre}</h2>
      <p className="text-gray-700 mb-2">{descripcion}</p>
      <p className="text-gray-900 font-semibold mb-2">${precio}</p>
      <p className="text-gray-600 mb-2">Categoría: {categoria}</p>
      <p className="text-gray-600 mb-2">Stock: {stock}</p>
      <p className="text-gray-600 mb-2">Vendedor: {vendedor}</p>
      <p className="text-gray-600">
        Fecha de Creación: {fechaCreacion.toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProductCard;
