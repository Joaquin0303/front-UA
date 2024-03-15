import React, { useState } from 'react'
import { updatePassword } from '../services/UserServices'
import PasswordRules from '../pages/UserAdmin/PasswordRules';
import { FaEye } from 'react-icons/fa';

export const ChangePassword = ({ userId, handleChangePassword, isEdge }) => {

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

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
      if (password) {
        setErrorMessage('');
        updatePassword(userId, password).then(r => {
          if (r.codigo == 400) {
            setErrorMessage("Ingrese una contraseña que cumpla con los requisitos indicados.");
          } else {
            handleChangePassword();
          }
        });
      }
    } catch (e) {
      console.error(e);
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
            {isEdge ?
              <>
                <p>Nueva Contraseña</p>
                <input type="password" name="" placeholder="" id="" onChange={e => setPassword(e.target.value)} />
                <p>Repita Nueva Contraseña</p>
                <input type="password" name="" placeholder="" id="" onChange={e => setConfirmPassword(e.target.value)}></input>
              </>
              :
              <>
                <p>Nueva Contraseña</p>
                <div className='password-no-edge'>
                  <input type={showPassword ? "text" : "password"} className="form-control" id="password-user" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                  <span className='p-viewer'>
                    <FaEye className='eye-icon' onClick={() => setShowPassword(!showPassword)} />
                  </span>
                </div>
                <p>Repita Nueva Contraseña</p>
                <div className='password-no-edge'>
                  <input type={showPassword ? "text" : "password"} className="form-control" id="password-user" placeholder="Contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                  <span className='p-viewer'>
                    <FaEye className='eye-icon' onClick={() => setShowPassword(!showPassword)} />
                  </span>
                </div>
              </>
            }

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
