import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Usar el contexto de autenticación

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Estado para confirmar contraseña
  const [nombre, setNombre] = useState<string>(""); // Estado para el nombre
  const [apellido, setApellido] = useState<string>(""); // Estado para el apellido
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar contraseñas coincidentes en registro
    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      if (isLogin) {
        // Iniciar sesión
        await login(email, password); // Usar la función login del contexto
        navigate("/"); // Redirigir al perfil
      } else {
        // Registro
        const payload = { email, password, nombre, apellido };
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          setErrorMessage(data.message || "Error al registrarse");
          return;
        }

        const data = await response.json();
        console.log("Registro exitoso", data);
        setIsLogin(true); // Cambiar al modo de inicio de sesión después del registro
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setErrorMessage(
        "Error en la autenticación. Por favor, verifica tus credenciales."
      );
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
                  onChange={(e) => setNombre(e.target.value)}
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
                  onChange={(e) => setApellido(e.target.value)}
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
