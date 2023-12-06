import React from "react";
import i18n from "../../localization/i18n";

const InputDate = ({ name, value, disabled, updateFormData }) => {

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input disabled={disabled} type="date" name={name} value={value} onChange={(e) => updateFormData(name, e.target.value)} />
        </div>
    );
}

export default InputDate;