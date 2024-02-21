import React from "react";
import i18n from "../../localization/i18n";
import { parseTodayStr2 } from "../../utils"

const InputDate = ({ validation, name, value, disabled, updateFormData, mandatory }) => {
    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}{mandatory && "*"}</label>
            {/* <input disabled={disabled} type="date" name={name} value={value ? new Date(value).toISOString().slice(0, 10) : ''} onChange={(e) => updateFormData(name, e.target.value)} required={mandatory} /> */}
            <input disabled={disabled} type="date" name={name} value={value ? parseTodayStr2(value) : ''} onChange={(e) => updateFormData(name, e.target.value)} required={mandatory} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}

export default InputDate;