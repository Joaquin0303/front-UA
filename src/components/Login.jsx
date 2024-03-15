import React, { useState } from 'react';
import '../styles/Login.css';
import '../styles/changePassword.css'
import logoempresa from '../img/logo-empresa.png';
import gifWork from '../img/work-team.gif';
import { login } from '../services/LoginAndSecurityServices'
import { LOGIN_MESSAGES } from '../utils/LoginConstants';
import { ChangePassword } from './changePassword';
import { codeToken } from '../utils/Utils';
import PopUp from '../components/modal/PopUp';
import { getPermissionIdByName, PERMISSION } from '../utils/PermissionList';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
// import { isIE } from 'react-device-detect';

const Login = ({ setToken }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userId, setUserId] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const createAccessToken = (login) => {
        const permissionIds = [];
        login.permisos.map(p => {
            const permissionName = getPermissionIdByName(p);
            if (permissionName)
                permissionIds.push(PERMISSION[permissionName].id);
        });
        try {
            const header = '{"alg": "HS256","typ": "JWT"}';
            const payload = '{"userId": ' + login.idUsuario + ', "numeroLegajo":' + login.numeroLegajo + ',"permissions": [' + permissionIds + '],"iat": 1516239022}';
            const jwtToken = codeToken(header, payload);

            //setToken({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WzEsMiwzXSwiZW1wbGVhZG8iOnsiY29kaWdvRGlyZWNjaW9uIjoxMjM0LCJjb2RpZ29Fc3RhZG9FbXBsZWFkbyI6ODcsImNvZGlnb0NhdGVnb3JpYUVtcGxlYWRvIjoxMjM0LCJjb2RpZ29QYWlzIjoxMjM0LCJub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXBlbGxpZG8iOiJTaXRpbyJ9fQ.lzoKvLBSVNrwOJTWTstpRFJnm_RjMdmIBxYI-NIYaWU" });
            setToken({ token: jwtToken });
            setErrorMessage('');

        } catch (e) {
            console.error(e);
        }
    }
    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const response = await login(username, password).then(response => {
                if (response.codigo == 200) {
                    if (response.model.primerAcceso) {
                        setUserId(response.model.idUsuario);
                        setShowChangePassword(true);
                    } else if (response.model.pudoAcceder) {
                        // Inside the handleLogin function
                        //const navigate = useNavigate();
                        //navigate.push('/');
                        createAccessToken(response.model);
                    } else {
                        setErrorMessage("Contraseña invalida.");
                    }
                } else if (response.codigo == 400) {
                    console.error(response.mensajes[0]);
                    switch (response.mensajes[0]) {
                        case LOGIN_MESSAGES.USER_BLOCKED:
                            setErrorMessage("Usuario inactivado, debe solicitar desbloqueo por Jira SM.")
                            break;
                        case LOGIN_MESSAGES.USER_NOT_FOUND:
                            setErrorMessage("No se encontró usuario con ese nombre o contraseña.");
                            break;
                        case LOGIN_MESSAGES.EXPIRE_PASSWORD:
                            setErrorMessage("La contraseña del usuario expiro. Comuníquese con Sistemas para recibir una nueva.");
                            break;
                    }
                }
                return response;
            });

        } catch (e) {
            setErrorMessage(e);
        }
    }

    const handleChangePassword = () => {
        setErrorMessage('');
        setShowChangePassword(false);
        setPopupMessage(<div className='message-min-popup'><div>La contrasaña se actualizó correctamente</div><div className='btns-container'><button className='btns-close' onClick={() => { setShowPopup(false); }}>Cerrar</button></div></div>);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 10000);
    }

    const isEdge = navigator.userAgent.includes("Edg");

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
                {showChangePassword ? (<ChangePassword userId={userId} handleChangePassword={handleChangePassword} isEdge={isEdge} />) : (
                    <>
                        <img src={gifWork} alt="gif-work" id='gif' />
                        <form className='form-login' onSubmit={handleSubmit}>
                            <h2>Iniciar Sesión</h2>
                            <div className="form-group-login">
                                <label htmlFor="login-user">Nombre de Usuario</label>
                                <input type="text" className="form-control" id="login-user" placeholder="Usuario" onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            {isEdge ?
                                <div className="form-group-login">
                                    <label htmlFor="password-user">Contraseña</label>
                                    <input type="password" className="form-control" id="password-user" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                :
                                <div className="form-group-login">
                                    <label htmlFor="password-user">Contraseña</label>
                                    <div className='password-no-edge'>
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="password-user" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        <span className='p-viewer'>
                                            <FaEye className='eye-icon' onClick={() => setShowPassword(!showPassword)} />
                                        </span>
                                    </div>
                                </div>
                            }
                            <p className="authFail">
                                {errorMessage}
                            </p>
                            <button type="submit" className="btn-login">
                                Ingresar
                            </button>
                        </form>
                    </>
                )}
            </div>
            {showPopup && <PopUp message={popupMessage} />}
        </>
    );
};

export default Login;