import { React, useContext } from 'react'
import { UserContext } from '../../App'
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import './Header.css'
import Logo from '../../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown/HeaderDropdown'
import GoogleBtn from './GoogleBtn/GoogleBtn';
import auth from '../../services/auth';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { USERTYPE } from '../../services/enums';

function Header() {
  const navigate = useNavigate();
  
  //Login  
  const { user, setUser } = useContext(UserContext);
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (tokenResponse) => {handleLogin(tokenResponse)},
    onError: errorResponse => console.log(errorResponse),
  });
  async function handleLogin(tokenResponse){
    const userInfo = await auth(tokenResponse.access_token);
    setUser(userInfo);
    
    try {
      const response = await api.get(`/usuarios/email/${userInfo.email}`);
      if (response.status === 200) {
        localStorage.setItem('accessToken', tokenResponse.access_token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem("userType", response.data.tipoUsuario);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate('/Perfil', { state: { tokenResponse: tokenResponse, userInfo: userInfo } });
      } else {
        toast.error('Erro ao realizar cadastro. Tente novamente mais tarde.');
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        googleLogout();
        navigate('/');
      }
    }
  }
  
  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <button className='btnNoBg' onClick={() => navigate("/")}>Home</button>
          <button className='btnNoBg' onClick={() => navigate("/Cuidadores")}>Cuidadores</button>
          {user ? <button className='btnNoBg' onClick={() => navigate("/Chat")}>Chat</button> : null}
          {user && localStorage.getItem("userType") === USERTYPE.ADM ? <button className='btnNoBg' onClick={() => navigate("/CadastroCuidador")}>Cadastro de Cuidadores</button> : null}
        </nav>
        { user ? <HeaderDropdown /> : 
          <div className='user'>
            <GoogleBtn onClick={login} />
          </div>
        }
    </header>
  )
}

export default Header