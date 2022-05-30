import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    if (email.trim() === "" || email.length < 6) {
      console.log("Email vacio");
      setAlerta({
        mensaje: "El email es obligatorio",
        error: true,
      })
      return;
    }
    try {
      const {data} = await clienteAxios.post("veterinarios/olvide-password", {email});
      setAlerta({
        mensaje: data.msg,
        error: false,
      })
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true,
      });
      console.log(error);
    }
      
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.mensaje && <Alerta alerta={alerta}/>}
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email de Registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
          <Link className="block text-center my-5 text-gray-500"to="/olvide-password">Olvideo mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword