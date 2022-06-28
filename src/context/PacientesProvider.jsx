import {createContext,useState,useEffect} from 'react'
import clienteAxios from '../config/axios'

const PacientesContext = createContext();

export const PacienteProvider = ({children}) => {
    
    const [pacientes,setPacientes] = useState([]);
    const [pacienteG,setPaciente] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const token = localStorage.getItem('token');
                const  config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.get('/pacientes',config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        }
        consultarAPI();
    },[]);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        if (paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config);
                const pacientesActualizados = pacientes.map(paciente => paciente._id === data._id ? data : paciente);
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/pacientes',paciente,config);
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        
    }

    const setEdicion = (paciente) => {
        console.log(paciente);
        setPaciente(paciente);
    }

    const eliminarPaciente = async (id) => {
        const confirmar =  confirm('¿Estas seguro de eliminar este paciente?');
        if (confirmar) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                await clienteAxios.delete(`/pacientes/${id}`,config);
                const pacientesActualizados = pacientes.filter(paciente => paciente._id !== id);
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }



    return(
        <PacientesContext.Provider value={{pacientes,eliminarPaciente,guardarPaciente,setEdicion,pacienteG}}>
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext