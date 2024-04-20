import { React, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useNavigate } from "react-router-dom"
import './Footer.css'
import Logo from '../../assets/img/logo.svg'

function Footer() {
    const { user, setUser } = useContext(UserContext);
    const [ role ] = useState('cuidador');

  const navigate = useNavigate();

  return (
    <footer>
        <img className="logo" src={Logo} alt="Elder.ly Logo"/>
        <nav>
          <button className='btnNoBg' onClick={() => navigate("/")}>Home</button>
          <button className='btnNoBg' onClick={() => navigate("/Contato")}>Contato</button>
          <button className='btnNoBg' onClick={() => navigate("/Cuidadores")}>Cuidadores</button>
          {user ? <button className='btnNoBg' onClick={() => navigate("/Chat")}>Chat</button> : null}
        </nav>
        <div className='slogan'>
          <b>Cuidado do que importa,</b>
          <p className='textFooter'>Para você</p>
        </div>
    </footer>
  )
}

export default Footer