import { React, useState } from 'react'
import Header from '../components/Header'
import './Sign.css'
import SignImage from '../assets/img/sign.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({ name: '', document: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(await axios.post('http://localhost:8080/signin', formData));
    } catch (error) {
      console.error('Failed to sign in:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="sign">
            <div className="imageContainer">
                <img src={SignImage} alt="Ilustração Login" />
            </div>
            <div className="formContainer">
              <div className="">
                <h1 className='formTitle'>Login</h1>
                <p className="formSubtitle">Entre para encontrar cuidadores prontos para você!</p>
              </div>
              <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Senha" />
                <button type="submit" className='btn'>Entrar</button>
              </form>
              <p className='formSubtitle' style={{marginTop: '1em'}}>Esqueceu sua Senha? <span style={{cursor: 'pointer', color: 'var(--primary)'}} onClick={() => navigate("/Cadastro")}>Recupere aqui</span></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignIn