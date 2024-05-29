import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cuidadores from './pages/Cuidadores';
import Perfil from './pages/Perfil';
import CadastroCuidador from './pages/CadastroCuidador';
import RelatorioCuidador from './pages/RelatorioCuidador';
import Authentication from './services/Authentication';
import { USERTYPE } from './services/enums';

function Router() {
  return (
    <BrowserRouter>                                        
      <Routes>       
				<Route path={"/"} element={<Home />} />
        <Route path="/Cuidadores" element={<Cuidadores />} />
        <Route path='/Perfil' element={<Authentication><Perfil/></Authentication>} />
        <Route path='/CadastroCuidador' element={<Authentication userType={USERTYPE.ADM}><CadastroCuidador/></Authentication>}/>
        <Route path='/RelatorioCuidador' element={<Authentication userType={USERTYPE.ADM}><RelatorioCuidador/></Authentication>}/>
				<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;