import React, { useEffect } from "react";
import i18n from "../../localization/i18n";

const InputText = ({ validation, name, value, updateFormData, disabled }) => {

    useEffect(() => {
        updateFormData(name, value);
    }, []);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input disabled={disabled} type="text" name={name} value={value} onChange={(e) => updateFormData(name, e.target.value)} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}

export default InputText;