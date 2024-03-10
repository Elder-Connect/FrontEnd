import React, { useState, useEffect, useRef } from 'react';
import './HeaderDropdown.css';
import DefaultProfilePic from '../assets/img/defaultProfilePic.svg'
import { ReactComponent as LogoutIcon } from '@material-symbols/svg-400/rounded/logout-fill.svg';
import { ReactComponent as ManageAccountIcon } from '@material-symbols/svg-400/rounded/manage_accounts-fill.svg';

function HeaderDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
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
  
    return (
      <div className="headerDropdown" ref={dropdownRef}>
        <div className="profilePic" onClick={toggleDropdown}>
          <img src={DefaultProfilePic} alt="Botão para acessar funções de usuário" />
        </div>
        {isOpen && (
          <div className="dropdownContent">
            <a href="/"><ManageAccountIcon className='icon' /><span>Meu Perfil</span></a>
            <a href="/"><LogoutIcon className='icon' /><span>Sair</span></a>
          </div>
        )}
      </div>
    );
  }

export default HeaderDropdown;
