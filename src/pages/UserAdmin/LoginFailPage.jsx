import React from 'react';
import '../../styles/Login.css';

const LoginFailPage = () => {
    return (
        <main className='login-fail'>
            <div className='login-fail-div'>
                <h1>Has agotado todos los intentos de inicio de sesión</h1>
                <h3>Comunicate con Sistemas</h3>
            </div>
        </main>
    )
}

export default LoginFailPage;