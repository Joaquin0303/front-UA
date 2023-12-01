import { useState } from 'react';

const useToken = () => {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if (userToken && userToken.token) {
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        } else {
            sessionStorage.removeItem('token');
            setToken(null);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;