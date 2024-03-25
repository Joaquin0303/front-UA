import { useEffect, useState } from 'react'

const InputRadioButton = ({ validation, name, value, options, disabled, updateFormData }) => {

    return (
        <div className='form-group'>
            <label htmlFor="">Activo</label>
            <input type="button" value="Si" name='option1' />
            <input type="button" value="No" name='option2' />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    )
}

export default InputRadioButton;