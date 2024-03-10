import React from 'react'
import './Header.css'
import Logo from '../assets/img/logo.svg'
import DefaultProfilePic from '../assets/img/defaultProfilePic.svg'

function Header() {
  return (
    <header>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <div className="links">
            <a href="/">Home</a>
            <a href="/">Contato</a>
            <a href="/">Cuidadores</a>
            {/* If Logado */}
            <a href="/">Chat</a>
            {/* If cuidador */}
            <a href="/">Agenda</a>
          </div>
          <div className="profilePic">
            <img src={DefaultProfilePic} alt="Foto de Perfil"/>
          </div>
          {/* Dropdown com opções de perfil */}
        </nav>
    </header>
  )
}

export default Header