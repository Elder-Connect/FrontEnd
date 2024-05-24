import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './HeaderDropdown.css';
import { ReactComponent as LogoutIcon } from '@material-symbols/svg-600/rounded/logout-fill.svg';
import { ReactComponent as ManageAccountIcon } from '@material-symbols/svg-600/rounded/manage_accounts-fill.svg';
import { UserContext } from '../../../App';
import { logOff } from '../../../services/auth';

function HeaderDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const signOut = () => {
      setUser(null);
      logOff();
      navigate('/');
    };
  
    return (
      <div className="headerDropdown" ref={dropdownRef}>
        <div className="profilePic" onClick={toggleDropdown}>
          <img src={user.picture} alt="Botão para acessar funções de usuário" />
        </div>
        {isOpen && (
          <div className="dropdownContent">
            <button onClick={() => navigate("/Perfil")}><ManageAccountIcon className='icon' />Meu Perfil</button>
            <button onClick={() => signOut()}><LogoutIcon className='icon' />Sair</button>
          </div>
        )}
      </div>
    );
  }

export default HeaderDropdown;
