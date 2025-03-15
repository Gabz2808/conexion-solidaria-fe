import React from "react";

interface PostProps {
  producto: {
    id: number;
    nombre: string;
    imagenSrc: string;
    imagenAlt: string;
    precio: string;
    stock: string;
    idVendedor: number;
    fechaCreacion: string;
  };
}

const Producto: React.FC<PostProps> = ({ producto }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square w-full rounded-t-lg bg-gray-200 overflow-hidden group-hover:opacity-75 lg:aspect-auto lg:h-80">
        <img
          src={producto.imagenSrc}
          alt={producto.imagenAlt}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {producto.nombre}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">Stock: {producto.stock}</p>
        <p className="mt-2 text-lg font-semibold text-gray-900">
          {producto.precio}
        </p>
      </div>
    </div>
  );
};

export default Producto;
