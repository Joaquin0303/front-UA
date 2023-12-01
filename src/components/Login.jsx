import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';

const loginUser = async (credentials) => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/ua/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(credentials)
    }).then(function (response) {
        if (response.data.codigo == 200) {
            return response.data.model;
        } else {
            throw response.data.mensajes[0];
        }

    }).catch(function (error) {
        console.error(error);
        throw error;
    }).finally(function () {
        // nothing
    });
    return response;
}

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const token = await loginUser({
                "userName": username,
                "password": password
            });
            setToken(token);
            setErrorMessage('');
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return (
        <div className="login-wrapper">
            <h1>{errorMessage}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Usuario</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <br />
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;