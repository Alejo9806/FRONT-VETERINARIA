import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { Link } from 'react-router-dom';

const NuevoPassword = () => {
    const params = useParams();
    const {token} = params;

    const [password,setPassword] = useState('');
    const [alerta,setAlerta] = useState({});
    const [tokenValido,setTokenValido] = useState(false);
    const [passwordModificado,setPasswordModificado] = useState(false);

    useEffect(() => {
        console.log('NuevoPassword');
        const validarToken = async () => {
            try {
                const url = `veterinarios/olvide-password/${token}`;
                const resultado = await clienteAxios.get(url);
                console.log(resultado);
                setAlerta({
                    mensaje: 'Coloca tu nuevo password',
                    error: false,
                });
                setTokenValido(true);
                setPasswordModificado(true);
            } catch (error) {
                console.log(error.response.data.msg);
                setAlerta({
                    'mensaje':"Hubo un error en el enlace de recuperación de contraseña",
                    'error':true
                });
            }
        }
        validarToken();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(password);
        if (password === '') {
            setAlerta({
                'mensaje':'Todos los campos son obligatorios',
                'error':true
            });
            return;
        }else if(password.length < 8){
            setAlerta({
                'mensaje':'La contraseña debe tener al menos 8 caracteres',
                'error':true
            });
            return;
        }
        try {
            const url = `veterinarios/olvide-password/${token}`;
            const resultado = await clienteAxios.post(url,{password});
            console.log(resultado);
            setAlerta({
                'mensaje':resultado.data.msg,
                'error':false
            });
        } catch (error) {         
            setAlerta({
                'mensaje':error.response.data.msg,
                'error':true
            });
        }
    }
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                Restablece tu password y no pierdas acceso a <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {alerta.mensaje && <Alerta alerta={alerta}/>}
                {tokenValido && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nueva Password</label>
                            <input type="password"
                            id="password" placeholder="Tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={(e) =>{setPassword(e.target.value)}}/>
                        </div>
                        <input type="submit" value="Restablecer" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                    </form>
                </>
            )}
            {passwordModificado &&                     
                <nav className="mt-10 lg:flex lg:justify-between">
                            <Link className="block text-center my-5 text-gray-500" to="/">Iniciar Sesion</Link>
                </nav>
            }
            </div>
            
        </>
    )
}

export default NuevoPassword