import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Cuidadores from './pages/Cuidadores';
import SignIn from './pages/SignIn';

function Router() {
  return (
    <BrowserRouter>                                        
      <Routes>       
				<Route path={"/"} element={<Home />} />
				<Route path="/Cadastro" element={<SignUp />} />
				<Route path="/Entrar" element={<SignIn />} />
        <Route path="/cuidadores" element={<Cuidadores />} />
				<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;