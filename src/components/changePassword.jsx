import React, { useState } from 'react'
import { updatePassword } from '../services/UserServices'
import PasswordRules from '../pages/UserAdmin/PasswordRules';

export const ChangePassword = ({ userId, handleChangePassword }) => {

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!password) {
        setErrorMessage('Campo Contraseña no debe estar vacío');
        return;
      }
      if (password != confirmPassword) {
        setErrorMessage('Las contraseñas no son idénticas, por favor ingresar la misma contraseña en ambos campos.');
        return;
      }
      console.log('change password: ', password);
      if (password) {
        setErrorMessage('');
        updatePassword(userId, password).then(r => {
          console.log('change password response: ', r);
          if (r.codigo == 400) {
            setErrorMessage(r.mensajes[0] /* Ingrese una contraseña que cumpla con los requisitos indicados. */);
          } else {
            handleChangePassword();
          }
        });
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e);
    }
  }

  return (
    <>
      <div>
        <div className="div-Padre">
          <PasswordRules />
          <form className="change-pass" onSubmit={handleSubmit}>
            <h1>Cambio de Contraseña</h1>
            <p>Nueva Contraseña</p>
            <input type="password" name="" placeholder="" id="" onChange={e => setPassword(e.target.value)} />
            <p>Repita Nueva Contraseña</p>
            <input type="password" name="" placeholder="" id="" onChange={e => setConfirmPassword(e.target.value)}></input>
            <p className="authFail">
              {errorMessage}
            </p>
            <button type="submit">Confirmar</button>
          </form>

        </div>
      </div>

    </>
  )
}
