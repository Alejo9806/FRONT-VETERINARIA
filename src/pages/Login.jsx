import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const {setAuth} = useAuth();
  const [usuario,setUsuario] = useState({'email':'','password':''});
  const [alerta,setAlerta] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(usuario.email.trim() === '' || usuario.password.trim() === ''){
      setAlerta({
        'mensaje':'Los campos no pueden estar vacios',
        error:true
      });
      return;
    }
    try {
      const {data} = await clienteAxios.post('veterinarios/login',usuario);
      console.log(data);
      localStorage.setItem('token',data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({
        'mensaje':error.response.data.msg,
        error:true
      });
    }    
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.mensaje && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input type="email" id="email"  name="email" value={usuario.email} onChange={handleChange} placeholder="Email de Registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={usuario.password} onChange={handleChange} placeholder="Email de Registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <input type="submit" value="Iniciar Sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-500"to="/olvide-password">Olvideo mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login