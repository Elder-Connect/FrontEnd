import React, { useContext, useState } from "react";
import "./GoogleBtn.css";
import { UserContext } from '../../../App'
import { useGoogleLogin } from '@react-oauth/google'
import { auth, logOff, setLocalStorage } from '../../../services/auth'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";

function GoogleBtn({ setModalState }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  //Login  
  const { user, setUser } = useContext(UserContext);
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (tokenResponse) => {handleLogin(tokenResponse)},
    onError: errorResponse => toast.error(errorResponse),
  });
  async function handleLogin(tokenResponse){
    setLoading(true);
    const userInfo = await auth(tokenResponse.access_token);
    setUser(userInfo);
    
    try {
      const response = await api.get(`/usuarios/email/${userInfo.email}`);
      setLoading(false);
      if(setModalState){
        setModalState(false);
      }
      if (response.status === 200) {
        setLocalStorage(tokenResponse, response.data);
      }
    } catch (error) {
      setLoading(false);
      if(setModalState){
        setModalState(false);
      }
      if (error.response && error.response.status === 404) {
        navigate('/Perfil', { state: { tokenResponse: tokenResponse, userInfo: userInfo } });
      } else {
        toast.error('Erro ao realizar cadastro. Tente novamente mais tarde.');
        setUser(null);
        logOff();
        navigate('/');
      }
    }
  }

  return (
    <>
      <Loading show={loading} />
      <div onClick={login} className="googleButton">
        Login com Google
      </div>
    </>
  );
}

export default GoogleBtn;
