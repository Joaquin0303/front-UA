import React from 'react';

const PasswordRules = () => {
    return (
        <div className='normas'>
            <p>Debe contener una longitud mínima de 8 (ocho) caracteres y un máximo de 16 (dieciséis) caracteres.</p>
            <p>Debe estar compuesta por la siguiente combinación caracteres:</p>
            <p>&#8226; Dígitos (0...9) </p>
            <p>&#8226; Minúsculas (a...z) </p>
            <p>&#8226; Mayúsculas (A...Z) </p>
            <p>&#8226; Símbolos (!...?)</p>
        </div>
    )
}

export default PasswordRules;