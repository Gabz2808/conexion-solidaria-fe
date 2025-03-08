import React from "react";
import Producto from "../Components/UI/product";

const Marketplace: React.FC = () => {
  const productos = [
    {
      id: 1,
      nombre: "Camiseta Básica",
      imagenSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imagenAlt: "Camiseta básica negra",
      precio: "$35",
      stock: "20",
      idVendedor: 1,
      fechaCreacion: "2023-01-01",
    },
    {
      id: 2,
      nombre: "Pantalones Vaqueros",
      imagenSrc:
        "https://botinescharros.com/cdn/shop/products/Pantalon-Vaquero-Recto-M7-Negro.jpg?v=1645055629&width=680",
      imagenAlt: "Pantalones vaqueros azules",
      precio: "$50",
      stock: "15",
      idVendedor: 2,
      fechaCreacion: "2023-01-05",
    },
    {
      id: 3,
      nombre: "Zapatillas Deportivas",
      imagenSrc:
        "https://m.media-amazon.com/images/I/61+162RpUWL._AC._SR360,460.jpg",
      imagenAlt: "Zapatillas deportivas blancas",
      precio: "$60",
      stock: "10",
      idVendedor: 3,
      fechaCreacion: "2023-01-10",
    },
    {
      id: 4,
      nombre: "Chaqueta de Cuero",
      imagenSrc:
        "https://i5.walmartimages.com/seo/Hood-Crew-Men-s-Pu-Faux-Leather-Jacket-with-Removable-Hood-Black-L_99aad850-b06a-41eb-b5b2-fa85dc03c653.196bde613dff9b0e6974ebd9dd0fc5f8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      imagenAlt: "Chaqueta de cuero negra",
      precio: "$120",
      stock: "5",
      idVendedor: 4,
      fechaCreacion: "2023-01-15",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10">
          Marketplace
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
