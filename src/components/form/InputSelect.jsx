import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";

const InputSelect = ({ multivalue, validation, name, value, options, disabled, updateFormData }) => {
    const changeHandler = (e) => {
        if (multivalue) {
            const v = parseInt(e.target.value)
            const index = value.indexOf(v);
            if (index >= 0) {
                value.splice(index, 1);
            } else {
                value.push(v);
            }
            updateFormData(name, value);
        } else {
            updateFormData(name, parseInt(e.target.value));
        }
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select className={multivalue ? "select-multivalue" : ""} multiple={multivalue} disabled={disabled} value={value} name={name} onChange={changeHandler}>
                {options && options.map((o, i) => {
                    return <option key={i} value={o.value}>{o.label}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputSelect;