import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import logoempresa from '../img/logo-empresa.png';

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
        <>
            <header>
                <div className="header">
                    <img src={logoempresa} id="logo-empresa" alt="" />
                </div>
            </header>
            <div className="login-wrapper">

                <h1>{errorMessage}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-user">Nombre de usuario</label>
                        <input type="text" className="form-control" id="login-user" placeholder="Nombre de usuario" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-user">Password</label>
                        <input type="password" className="form-control" id="password-user" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;