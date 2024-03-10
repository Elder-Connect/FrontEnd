import { React, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Header.css'
import Logo from '../assets/img/logo.svg'
import HeaderDropdown from './HeaderDropdown'
import Button from './Button'

function Header() {
  const [isLoged, setIsLoged] = useState(false);
  const [role, setRole] = useState('cuidador');

  const navigate = useNavigate();

  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <Button path="/" text="Home"/>
          <Button path="/Contato" text="Contato"/>
          <Button path="/Cuidadores" text="Cuidadores"/>
          {isLoged ? <Button path="/Chat" text="Chat"/> : null}
          {isLoged && role === 'cuidador' ? <Button path="/Agenda" text="Agenda"/> : null}
        </nav>
        { isLoged ? <HeaderDropdown /> : <div className='user'><Button path="/Login" primaryColor={true} text="Login"/> <Button path="/Cadastro" filled={true} text="Cadastre-se"/></div>}
    </header>
  )
}

export default Header