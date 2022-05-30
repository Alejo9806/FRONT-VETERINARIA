import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Login from './pages/Login';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import Registrar from './pages/Registrar';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './pages/AdministrarPacientes';

import {AuthProvider} from './context/AuthProvider';
import {PacienteProvider} from './context/PacientesProvider';
import Perfil from './pages/Perfil';
import CambiarPassword from './pages/CambiarPassword';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path='/' exact element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />
              <Route path='registrar' element={<Registrar/>} />
              <Route path='olvide-password' element={<OlvidePassword/>} />
              <Route path='olvide-password/:token' element={<NuevoPassword/>} />
            </Route>
            <Route path='/admin' exact element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path='perfil' element={<Perfil/>} />
              <Route path='cambiar-password' element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )

}

export default App
