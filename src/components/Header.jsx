import { React, useState } from 'react'
import './Header.css'
import Logo from '../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown'
import Button from './Button'

function Header() {
  const [isLoged, setIsLoged] = useState(false);
  const [role, setRole] = useState('cuidador');
  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <a href="/"><span>Home</span></a>
          <a href="/"><span>Contato</span></a>
          <a href="/"><span>Cuidadores</span></a>
          {isLoged ? <a href="/"><span>Chat</span></a> : null}
          {isLoged && role === 'cuidador' ? <a href="/"><span>Agenda</span></a> : null}
        </nav>
        { isLoged ? <HeaderDropdown /> : <div className='user'><Button filled={false} text="Login"/> <Button filled={true} text="Cadastre-se"/></div>}
    </header>
  )
}

export default Header