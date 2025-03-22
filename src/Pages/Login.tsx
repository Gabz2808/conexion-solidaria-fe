import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Agregar estado para confirmar contraseña
  const [nombre, setnombre] = useState<string>(""); // Nuevo estado para el nombre
  const [apellido, setapellido] = useState<string>(""); // Nuevo estado para el apellido
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      email,
      password,
      nombre,
      apellido,
    };

    try {
      let response;
      if (isLogin) {
        response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        const data = await response.json();
        console.error("Error de autenticación:", data.message);
        setErrorMessage(data.message || "Error de autenticación");
        return;
      }

      const data = await response.json();
      console.log("Autenticación exitosa", data);

      // Guardar el token en el almacenamiento local
      localStorage.setItem("access_token", data.access_token);

      const token = localStorage.getItem("access_token"); // Obtener el token almacenado
      fetch("http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token como Bearer en el encabezado
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
      console.log("Token almacenado:", data.access_token);
      navigate("/profile");
    } catch (error) {
      console.error("Hubo un error:", error);
      setErrorMessage("Hubo un error en la solicitud");
    }
  };

  const switchMode = () => {
    setIsLogin((prevState) => !prevState);
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#F5F5F5] p-8 rounded shadow-2xl w-96">
        <h2 className="text-3xl font-semibold mb-6 text-[#003366] text-center">
          {isLogin ? "Iniciar sesión" : "Registro"}
        </h2>
        {errorMessage && (
          <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label
                  className="block text-[#003366] text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setnombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#003366] text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setapellido(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              className="block text-[#003366] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#003366] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label
                className="block text-[#003366] text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirmar Contraseña
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-[#B22222] hover:bg-[#8B0000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              type="submit"
            >
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </button>
            <button
              className="text-sm text-[#5F9EA0] hover:text-[#003366]"
              onClick={switchMode}
            >
              {isLogin
                ? "¿No tienes una cuenta? Regístrate"
                : "¿Ya tienes una cuenta? Inicia sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
