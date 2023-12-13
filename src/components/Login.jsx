import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import logoempresa from '../img/logo-empresa.png';
import gifWork from '../img/work-team.gif';
import { loginUser } from '../services/UserServices';

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
                <img src={gifWork} alt="gif-work" id='gif' />
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <div className="form-group-login">
                        <label htmlFor="login-user">Nombre de Usuario</label>
                        <input type="text" className="form-control" id="login-user" placeholder="Nombre de usuario" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="form-group-login">
                        <label htmlFor="password-user">Contraseña</label>
                        <input type="password" className="form-control" id="password-user" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <p className="authFail">
                        {errorMessage}
                    </p>
                    <button type="submit" className="btn-login">Ingresar</button>
                </form>
            </div>
        </>
    )
}

export default Login;