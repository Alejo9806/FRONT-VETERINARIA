import React from 'react'

const Alerta = (props) => { 
    const {alerta} = props;
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-indigo-400 to-indigo-600'} 
    bg-gradient-to-r text-center text-white uppercase text-sm p-3 rounded-md font-bold mb-10`}>
        {alerta.mensaje}
    </div>
  )
}

export default Alerta