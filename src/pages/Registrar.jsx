import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [usuario,setUsuario] = useState({'email':'','password':'','nombre':'','repetirPassword':''});
  const [alerta,setAlerta] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name);
    setUsuario({
      ...usuario,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(usuario);
    if (usuario.nombre === '' || usuario.email === '' || usuario.password === '' || usuario.repetirPassword === '') {
      setAlerta({
        'mensaje':'Todos los campos son obligatorios',
        'error':true
      });
    }else if(usuario.password.length < 8){
      setAlerta({ 
        'mensaje':'La contraseña debe tener al menos 8 caracteres',
        'error':true
      });
    }else if (usuario.password !== usuario.repetirPassword) {
      setAlerta({
        'mensaje':'Las contraseñas no coinciden',
        'error':true
      });
    } else {
      setAlerta({});
      //Crear el usuario en la api
      try {
        const url = `veterinarios`;
        await clienteAxios.post(url,{nombre:usuario.nombre,email:usuario.email,password:usuario.password});
        setAlerta({
          'mensaje':'Usuario creado correctamente revisa tu email para confirmar tu cuenta',
          'error':false
        });
      } catch (error) {
        setAlerta({
          'mensaje':error.response.data.msg,
          'error':true
        });
        console.log(error.response.data.msg);
      }
        
      }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
       {alerta.mensaje && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
            <input type="text" 
            id="nombre" placeholder="Tu nombre" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={usuario.nombre}
            onChange={handleChange}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input type="email" 
            id="email" 
            placeholder="Email de Registro" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={usuario.email}
            onChange={handleChange}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
            <input type="password" 
            id="password" 
            placeholder="Password" 
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={usuario.password}
            onChange={handleChange}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="repetirPassword">Confirmar Password</label>
            <input type="password"
             id="repetirPassword" 
             placeholder="Repite tu Password" 
             className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
             value={usuario.repetirPassword}
             onChange={handleChange}/>
          </div>
          <input type="submit" 
          value="Crear Cuenta" 
          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
          <Link className="block text-center my-5 text-gray-500"to="/olvide-password">Olvideo mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar