import React from "react";
import i18n from "../../localization/i18n";

const InputText = ({ name, value, updateFormData, disabled }) => {

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input disabled={disabled} type="text" name={name} value={value} onChange={(e) => updateFormData(name, e.target.value)} />
        </div>
    );
}

export default InputText;