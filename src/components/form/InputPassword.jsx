import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import PasswordRules from "../../pages/UserAdmin/PasswordRules";

const InputPassword = ({ validation, name, value, updateFormData, disabled }) => {

    const [showPasswordRules, setShowPasswordRules] = useState(false);

    useEffect(() => {
        updateFormData(name, value);
    }, []);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input disabled={disabled} type="password" name={name} value={value ? value : ''} onChange={(e) => updateFormData(name, e.target.value)} onFocus={() => { setShowPasswordRules(true) }} onBlur={() => { setShowPasswordRules(false) }} />
            {showPasswordRules && <PasswordRules size={'small'} />}
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}

export default InputPassword;