import axios from 'axios';

async function auth(access_token){
    const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return userInfo.data;
};

export default auth;