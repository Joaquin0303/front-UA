import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import logoempresa from '../img/logo-empresa.png';
import gifWork from '../img/work-team.gif';
import { loginUser } from '../services/UserServices';
import { login } from '../services/LoginAndSecurityServices'
import { LOGIN_MESSAGES } from '../utils/LoginConstants';
import { ChangePassword } from './changePassword';

const Login = ({ setToken }) => {
    const [showChangePassword, setShowChangePassword] = useState(true);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const response = await login(username, password).then(response => {
                console.log('login response: ', response)
                if (response.codigo == 200) {
                    setToken({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WzEsMiwzXSwiZW1wbGVhZG8iOnsiY29kaWdvRGlyZWNjaW9uIjoxMjM0LCJjb2RpZ29Fc3RhZG9FbXBsZWFkbyI6ODcsImNvZGlnb0NhdGVnb3JpYUVtcGxlYWRvIjoxMjM0LCJjb2RpZ29QYWlzIjoxMjM0LCJub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXBlbGxpZG8iOiJTaXRpbyJ9fQ.lzoKvLBSVNrwOJTWTstpRFJnm_RjMdmIBxYI-NIYaWU" });
                    setErrorMessage('');
                } else if (response.codigo == 400) {
                    switch (response.mensajes[0]) {
                        case LOGIN_MESSAGES.USER_BLOCKED:
                            setErrorMessage(response.mensajes[0]);
                            break;
                        case REPEATED_PASSWORD:
                            setErrorMessage(response.mensajes[0]);
                            break;
                        case USER_NOT_FOUND:
                            setErrorMessage(response.mensajes[0]);
                            break;
                        case PATTERN_NO_VALID:
                            setErrorMessage(response.mensajes[0]);
                            break;
                        case IS_FIRST_ACCESS:
                            break;
                    }
                }
                return response;
            });

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

            <div className='title-login'>
                <h1>ABM HR System</h1>
            </div>

            <div className="login-wrapper">
                <img src={gifWork} alt="gif-work" id='gif' />
                {!showChangePassword && <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <div className="form-group-login">
                        <label htmlFor="login-user">Nombre de Usuario</label>
                        <input type="text" className="form-control" id="login-user" placeholder="Usuario" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="form-group-login">
                        <label htmlFor="password-user">Contraseña</label>
                        <input type="password" className="form-control" id="password-user" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <p className="authFail">
                        {errorMessage}
                    </p>
                    <button type="submit" className="btn-login">Ingresar</button>
                </form>}
                {showChangePassword && <ChangePassword />}
            </div>

        </>
    )
}

export default Login;