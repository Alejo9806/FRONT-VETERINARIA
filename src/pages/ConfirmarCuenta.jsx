import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";



const ConfirmarCuenta = () => {

  const [cuentaConfirmada,setCuentaConfirmada] = useState(false);
  const [cargando,setCargando] = useState(true);
  const [alerta,setAlerta] = useState({});

  const params = useParams();
  const {id} = params;

  useEffect(() => {    const confirmarCuenta = async () => {
    try {
      const url = `veterinarios/confirmar/${id}`;
      const {data} = await clienteAxios.get(url);
      console.log(data);
      setCuentaConfirmada(true);
      setAlerta({
        mensaje:data.msg,
        error:false
      });
    } catch (error) {
      setAlerta({
        mensaje:error.response.data.msg,
        error:true
      });
    }
    setCargando(false);
  }
  confirmarCuenta();
    console.log('i fire once');
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar {""}<span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white items-center">
          {!cargando && <Alerta alerta={alerta}/>}
          {cuentaConfirmada && 
            <>
              <h1 className="text-indigo-600 font-black text-6xl">Cuenta Confirmada</h1>
              <a href="/" className="text-indigo-500 hover:text-indigo-600">Iniciar Sesion</a>
            </>
          }
      </div>

  </>
  )
}

export default ConfirmarCuenta;