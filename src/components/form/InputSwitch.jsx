import React from "react";
import i18n from "../../localization/i18n";

const InputSwitch = ({ name, value, disabled, updateFormData }) => {

    return (
        <div className='form-check form-switch'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input disabled={disabled} type='checkbox' className='form-check-input' value='' checked={value} onChange={(e) => updateFormData(name, e.target.checked)} />
        </div>
    )
}

export default InputSwitch;