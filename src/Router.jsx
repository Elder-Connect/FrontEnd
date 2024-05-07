import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Cuidadores from './pages/Cuidadores';
import Perfil from './pages/Perfil';
import CadastroCuidador from './pages/CadastroCuidador';
import Authentication from './services/Authentication';

function Router() {
  return (
    <BrowserRouter>                                        
      <Routes>       
				<Route path={"/"} element={<Home />} />
				<Route path="/Cadastro" element={<SignUp />} />
        <Route path="/Cuidadores" element={<Cuidadores />} />
        <Route path='/Perfil' element={<Authentication><Perfil/></Authentication>} />
        <Route path='/CadastroCuidador' element={<Authentication><CadastroCuidador/></Authentication>}/>
				<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;