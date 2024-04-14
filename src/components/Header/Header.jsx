import { React, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import './Header.css'
import Logo from '../../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown/HeaderDropdown'
import auth from '../../services/auth';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [ role ] = useState('cuidador');

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setUser(await auth(tokenResponse.access_token));
      localStorage.setItem('accessToken', tokenResponse.access_token);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <button className='btnNoBg' onClick={() => navigate("/")}>Home</button>
          <button className='btnNoBg' onClick={() => navigate("/Contato")}>Contato</button>
          <button className='btnNoBg' onClick={() => navigate("/Cuidadores")}>Cuidadores</button>
          {user ? <button className='btnNoBg' onClick={() => navigate("/Chat")}>Chat</button> : null}
          {user && role === 'cuidador' ? <button className='btnNoBg' onClick={() => navigate("/Agenda")}>Agenda</button> : null}
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