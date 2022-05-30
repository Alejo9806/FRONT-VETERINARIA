import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'

const CambiarPassword = () => {

    const [password, setPassword] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [alerta, setAlerta] = useState({});
    const { actualizarPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password  === '' || passwordNuevo === '') {
            setAlerta({
                mensaje:'Todos los campos son obligatorios',
                error:true
            });
            return;
        }
        if (passwordNuevo.length < 8) {
            setAlerta({
                mensaje:'La contraseña debe tener al menos 8 caracteres',
                error:true
            });
            return;
        }

        const alertaPassword = await actualizarPassword({password,passwordNuevo});
        setAlerta(alertaPassword);
    }

    return (
        <>
            <AdminNav/>
            <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>
            <p className='text-cl mt-5 mb-10 text-center'>Modifica tu {''} <span className='text-indigo-600 font-bold'>Password aqui</span></p>
            <div className='flex justify-center'>
                    <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                        {alerta.mensaje && <Alerta alerta={alerta}/>}
                        <form onSubmit={handleSubmit}>
                            <div className='my-3'>
                                <label htmlFor="nombre" className='uppercase font-bold text-gray-600'>Password Actual</label>
                                <input type="password" id='password' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='password' value={password} onChange={(e) =>  setPassword(e.target.value)}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor="nombre" className='uppercase font-bold text-gray-600'>Password Nueva</label>
                                <input type="password" id='passwordNuevo' className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='passwordNuevo' value={passwordNuevo} onChange={(e) =>  setPasswordNuevo(e.target.value)}/>
                            </div>
                            <input type="submit" value="Guardar Cambios" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer' />
                        </form>
                    </div>
                </div>
        </>
    )
}

export default CambiarPassword