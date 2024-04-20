import { React, useContext, useState } from 'react'
import Header from '../components/Header/Header'
import './Sign.css'
import SignImage from '../assets/img/sign.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import { UserContext } from '../App';

function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { tokenResponse } = useLocation().state;
  const { userInfo } = useLocation().state;
  const [usuarioFormData, setUsuarioFormData] = useState({
    nome: userInfo.name,
    email: userInfo.email,
    documento: '',
    tipoGenero: 1,
    tipoUsuario: 3
  });
  const [enderecoFormData, setEnderecoFormData] = useState({
    cep: '',
    logradouro: '',
    numeroCasa: '',
    complemento: '',
    cidade: '',
    uf: ''
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/usuarios/cliente', {novoUsuario: usuarioFormData, novoEndereco: enderecoFormData});
      if(response.status === 201){
        navigate('/Cuidadores');
        localStorage.setItem('accessToken', tokenResponse.access_token);
        localStorage.setItem('userId', response.data.id);
      }
    } catch (error) {
      console.error('Failed to sign up:', error.message);
    }
  };

  const handleDocumentChange = (event) => {
    const { value } = event.target;
    let maskedValue = value;
    maskedValue = value.replace(/[^\d]/g, '');
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
    setUsuarioFormData((prevState) => ({
      ...prevState,
      documento: maskedValue,
    }));
  }

  const handleCepChange = async (event) => {
    const { value } = event.target;
    let maskedValue = value;
    maskedValue = maskedValue.replace(/\D/g, "");
    maskedValue = maskedValue.replace(/(\d{5})(\d)/, "$1-$2");
    if (maskedValue.length === 9) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${maskedValue}/json/`
        );
        const address = response.data;
        setEnderecoFormData((prevState) => ({
          ...prevState,
          cep: maskedValue,
          logradouro: address.logradouro,
          cidade: address.localidade,
          uf: address.uf,
        }));
      } catch (error) {
        console.log("Failed to fetch address:", error.message);
      }
    }else{
      setEnderecoFormData((prevState) => ({
        ...prevState,
        cep: maskedValue,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnderecoFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

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
                <input type="text" name="document" maxLength={18} value={usuarioFormData.documento} onChange={handleDocumentChange} placeholder="CPF/CNPJ" />
                <input type="text" name="cep" maxLength={9} value={enderecoFormData.cep} onChange={handleCepChange} placeholder="CEP" />
                <input type="text" name="logradouro" value={enderecoFormData.logradouro} onChange={handleInputChange} placeholder="Logradouro" />
                <input type="number" name="numeroCasa" value={enderecoFormData.numeroCasa} onChange={handleInputChange} placeholder="Número" />
                <input type="text" name="complemento" value={enderecoFormData.complemento} onChange={handleInputChange} placeholder="Complemento" />
                <input type="text" name="cidade" value={enderecoFormData.cidade} onChange={handleInputChange} placeholder="Cidade" />
                <input type="text" name="uf" value={enderecoFormData.uf} onChange={handleInputChange} placeholder="Estado" />
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