import { useEffect,useState,createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando,setCargando] = useState(true);
    const [auth,setAuth] = useState({});
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(token){
                try {
                    const {data} = await clienteAxios.get('/veterinarios/perfil',{
                        headers:{
                            "Content-type":"application/json",
                            Authorization:`Bearer ${token}`
                        }
                    });
                    setAuth(data);
                } catch (error) {
                    console.log(error);
                    setAuth({})
                }
            }
            setCargando(false);
        }
        autenticarUsuario();
    },[]);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async (perfil) => {
        try {
            const {data} = await clienteAxios.put(`/veterinarios/perfil/${perfil._id}`,perfil,{
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            setAuth(data);
            return {
                mensaje:'Perfil Actualizado',
                error:false
            }
        } catch (error) {
            return {
                mensaje: error.response.data.msg, 
                error:true
            };
        }
    }

    const actualizarPassword = async (datos) => {
        try {
            console.log(datos);
            await clienteAxios.put('/veterinarios/actualizar-password',datos,{
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            return {
                mensaje:'Contraseña Actualizada',
                error:false
            }
        } catch (error) {
            return {
                mensaje: error.response.data.msg,
                error:true
            };
        }
    }

    
    return(
        <AuthContext.Provider value={{auth,setAuth,cargando,cerrarSesion,actualizarPerfil,actualizarPassword}}>
            {children}
        </AuthContext.Provider>
    )
}



export {AuthProvider}

export default AuthContext;