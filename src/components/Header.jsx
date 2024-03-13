import { React, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Header.css'
import Logo from '../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown'

function Header() {
  const [isLoged, setIsLoged] = useState(false);
  const [role, setRole] = useState('cuidador');

  const navigate = useNavigate();

  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <button className='btnNoBg' onClick={() => navigate("/")}>Home</button>
          <button className='btnNoBg' onClick={() => navigate("/Contato")}>Contato</button>
          <button className='btnNoBg' onClick={() => navigate("/Cuidadores")}>Cuidadores</button>
          {isLoged ? <button className='btnNoBg' onClick={() => navigate("/Chat")}>Chat</button> : null}
          {isLoged && role === 'cuidador' ? <button className='btnNoBg' onClick={() => navigate("/Agenda")}>Agenda</button> : null}
        </nav>
        { isLoged ? <HeaderDropdown /> : 
          <div className='user'>
            <button className='btnLogin' onClick={() => navigate("/Entrar")}>Login</button> 
            <button className='btn' onClick={() => navigate("/Cadastro")}>Cadastro</button>
          </div>
        }
    </header>
  )
}

export default Header