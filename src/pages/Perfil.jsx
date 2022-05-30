import React, { useState,useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const Perfil = () => {
    const {auth,actualizarPerfil} = useAuth();
    const [perfil,setPerfil] = useState({});
    const [alerta,setAlerta] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPerfil({
            ...perfil,
            [name]:value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {nombre,email} = perfil;

        if ([nombre,email].includes('')) {
            setAlerta({
                mensaje:'Los campos Nombre y Email son obligatorios',
                error:true
            });
            return;
        }
        const alertaPerfil =  await actualizarPerfil(perfil);
        setAlerta(alertaPerfil);
    }
    

    return (
        <>
            <AdminNav/>
            <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
            <p className='text-cl mt-5 mb-10 text-center'>Modifica tu {''} <span className='text-indigo-600 font-bold'>Informacion aqui</span></p>
            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    {alerta.mensaje && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="nombre" className='uppercase font-bold text-gray-600'>Nombre</label>
                            <input type="text" id='nombre' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='nombre' value={perfil.nombre || ''} onChange={handleChange}/>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="web" className='uppercase font-bold text-gray-600'>Sitio Web</label>
                            <input type="text" id='web' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='web' value={perfil.web || ''} onChange={handleChange}/>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="telefono" className='uppercase font-bold text-gray-600'>Telefono</label>
                            <input type="text" id='telefono' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='telefono' value={perfil.telefono || ''} onChange={handleChange}/>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="email" className='uppercase font-bold text-gray-600'>Email</label>
                            <input type="email" id='email' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='email' value={perfil.email || ''} onChange={handleChange}/>
                        </div>
                        <input type="submit" value="Guardar Cambios" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Perfil