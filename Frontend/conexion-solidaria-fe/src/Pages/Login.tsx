import React, { useState } from "react";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Correo electrónico:", email);
    console.log("Contraseña:", password);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  const switchMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-[#F5F5F5] p-8 rounded shadow-2xl w-96">
        <h2 className="text-3xl font-semibold mb-6 text-[#003366] text-center">
          {isLogin ? "Iniciar sesión" : "Registro"}
        </h2>
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label
                className="block text-[#003366] text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirmar contraseña
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
