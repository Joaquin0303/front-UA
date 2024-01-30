import React from 'react'


export const ChangePassword = () => {
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
          <form className="change-pass">
            <h1>Cambio de Contraseña</h1>
            <p>Nueva Contraseña</p>
            <input type="text" name="" placeholder="" id=""></input>
            <p>Repita Nueva Contraseña</p>
            <input type="text" name="" placeholder="" id=""></input>
            <button type="submit">Confirmar</button>
          </form>
        </div>
      </div>

    </>
  )
}
