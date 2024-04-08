import { React, useState } from 'react'
import Header from '../components/Header'
import './Sign.css'
import SignImage from '../assets/img/sign.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', document: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let maskedValue = value;
    if (name === 'document') {
      maskedValue = value.replace(/[^\d]/g, '');
      if (maskedValue.length > 14) {
        maskedValue = maskedValue.slice(0, 14);
      }
      if (maskedValue.length <= 11) {
        maskedValue = maskedValue.replace(/^(\d{3})(\d)/, '$1.$2');
        maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      } else {
        maskedValue = maskedValue.replace(/^(\d{2})(\d)/, '$1.$2');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
      }
    }
  
    setFormData({ ...formData, [name]: maskedValue });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      console.log(await axios.post('http://localhost:8080/signup', formData));
    } catch (error) {
      console.error('Failed to sign up:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="sign">
            <div className="imageContainer">
                <img src={SignImage} alt="Ilustração Cadastro" />
            </div>
            <div className="formContainer">
              <div className="">
                <h1 className='formTitle'>Cadastro</h1>
                <p className="formSubtitle">Cadastre-se agora para encontrar cuidadores prontos para você!</p>
              </div>
              <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome" />
                <input type="text" name="document" value={formData.document} onChange={handleInputChange} placeholder="CPF/CNPJ" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Senha" />
                <button type="submit" className='btn'>Cadastro</button>
              </form>
              <p className='formSubtitle' style={{marginTop: '1em'}}>Já tem uma conta? <span className='textLink' onClick={() => navigate("/Entrar")}>Faça Login</span></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp