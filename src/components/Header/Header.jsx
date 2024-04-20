import { React, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import './Header.css'
import Logo from '../../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown/HeaderDropdown'
import auth from '../../services/auth';
import api from '../../services/api';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [ role ] = useState('cuidador');

  const navigate = useNavigate();

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
      }
    } catch (error) {
      if (error.response.status === 404) {
        navigate('/Cadastro', { state: { userInfo, tokenResponse } });
      } else {
        console.error('Error retrieving user data:', error);
      }
    }
  }
  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <button className='btnNoBg' onClick={() => navigate("/")}>Home</button>
          <button className='btnNoBg' onClick={() => navigate("/Contato")}>Contato</button>
          <button className='btnNoBg' onClick={() => navigate("/Cuidadores")}>Cuidadores</button>
          {user ? <button className='btnNoBg' onClick={() => navigate("/Chat")}>Chat</button> : null}
        </nav>
        { user ? <HeaderDropdown /> : 
          <div className='user'>
            <button className='btn' onClick={login}>Entrar com Google</button>
          </div>
        }
    </header>
  )
}

export default Header