import { useEffect, useState } from 'react'
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {
    const [paciente,setPaciente] = useState({'nombre':'','email':'','propietario':'','fecha':'','sintomas':''});
    const [alerta,setAlerta] = useState({});
    const {guardarPaciente,pacienteG} = usePacientes();
    const [id,setId] = useState(null);

    useEffect(() => {
        if(pacienteG?.nombre && pacienteG?.email && pacienteG?.propietario && pacienteG?.fecha && pacienteG?.sintomas) {
            setPaciente(pacienteG);
            setId(pacienteG._id);
        }
    },[pacienteG]);

    const handleChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.id]:e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validar el formulario
        if(paciente.nombre.trim() === '' || paciente.email.trim() === '' || paciente.propietario.trim() === '' || paciente.fecha.trim() === '' || paciente.sintomas.trim() === ''){
            setAlerta({
                'mensaje':'Todos los campos son obligatorios',
                'error':true
            });
            return;
        }
        paciente.id = id;
        guardarPaciente(paciente);

        setAlerta({
            'mensaje':'Guardado Correctamente',
            'error':false
        });
        setPaciente({'nombre':'','email':'','propietario':'','fecha':'','sintomas':''});
        setId(null);
    }

    return (
        <>
            <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
            <p className='text-lg text-center mb-10'>Añade tus pacientes y {''} <span className='text-indigo-600 font-bold'>Administralos</span></p>
            <form className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md pb-5' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label htmlFor='nombre' className='text-gray-700 uppercase font-bold'>Nombre Mascota</label>
                    <input type="text" value={paciente.nombre} onChange={handleChange} id='nombre' placeholder='Nombre de la mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <div className='mb-5'>
                    <label htmlFor='propietario' className='text-gray-700 uppercase font-bold'>Nombre Propietario</label>
                    <input type="text" value={paciente.propietario} onChange={handleChange} id='propietario' placeholder='Nombre del propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <div className='mb-5'>
                    <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Email Propietario</label>
                    <input type="email" value={paciente.email} onChange={handleChange} id='email' placeholder='Email del propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <div className='mb-5'>
                    <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>Fecha Alta</label>
                    <input type="date" value={paciente.fecha} onChange={handleChange} id='fecha' placeholder='Fecha de alta' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <div className='mb-5'>
                    <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>Sintomas</label>
                    <input type="text" value={paciente.sintomas} onChange={handleChange} id='sintomas' placeholder='Describe los sintomas' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'  } className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer transition-colors' />
            </form>
            {alerta.mensaje && <Alerta alerta={alerta}/>}
        </>

    )
}

export default Formulario