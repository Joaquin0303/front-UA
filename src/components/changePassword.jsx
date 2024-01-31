import React, { useState } from 'react'
import { updatePassword } from '../services/UserServices'

export const ChangePassword = ({ userId }) => {

  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      console.log("cambio de contrasena " + password);
      if (password != repeatPassword) {
        setErrorMessage('Las contraseñas ingresadas no coinciden.');
        return;
      }
      if (password) {
        const response = await updatePassword(userId, password).then(response => {
          console.log('change password response: ', response)
          return response;
        });
      }

    } catch (e) {
      setErrorMessage(e);
    }
  }

  return (
    <>
      <div>
        <div className="div-Padre">
          <div className="normas">
            <p>Debe contener una longitud mínima de 8 (ocho) caracteres y un máximo de 16 (dieciséis)
              caracteres.</p>
            <p>Debe estar compuesta por la siguiente combinación caracteres:</p>
            <p>&#8226; Dígitos (0...9) </p>
            <p>&#8226; Minúsculas (a...z) </p>
            <p>&#8226; Mayúsculas (A...Z) </p>
            <p>&#8226; Símbolos (!...?)</p>
          </div>
          <form className="change-pass" onSubmit={handleSubmit}>
            <h1>Cambio de Contraseña</h1>
            <p>Nueva Contraseña</p>
            <input type="password" name="" placeholder="" id="" onChange={e => setPassword(e.target.value)} />
            <p>Repita Nueva Contraseña</p>
            <input type="password" name="" placeholder="" id="" onChange={e => setRepeatPassword(e.target.value)}></input>
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
