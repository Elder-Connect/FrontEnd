import axios from 'axios';
import { googleLogout } from '@react-oauth/google';


export async function auth(access_token){
    const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return userInfo.data;
};

export function logOff(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    googleLogout();
}

export function setLocalStorage(tokenResponse, user){
    localStorage.setItem('accessToken', tokenResponse.access_token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem("userType", user.tipoUsuario);
}