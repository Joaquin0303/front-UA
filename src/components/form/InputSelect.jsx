import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";

const InputSelect = ({ multivalue, validation, name, value, options, disabled, updateFormData }) => {
    const changeHandler = (e) => {
        if (multivalue) {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            updateFormData(name, values);
        } else {
            updateFormData(name, parseInt(e.target.value));
        }
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select className={multivalue ? "select-multivalue" : ""} multiple={multivalue} disabled={disabled} value={value} defaultValue={value} name={name} onChange={changeHandler}>
                {options && options.map((o, i) => {
                    return <option key={i} value={o.value}>{o.label}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputSelect;