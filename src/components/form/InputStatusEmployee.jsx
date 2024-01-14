import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";

const InputStatusEmployee = ({ multiple, validation, name, values, disabled, updateFormData }) => {
    const selectorChangeHandler = (e) => {
        if (multiple) {
            const v = parseInt(e.target.value)
            const index = values.indexOf(v);
            if (index >= 0) {
                values.splice(index, 1);
            } else {
                values.push(v);
            }
            updateFormData(name, values);
        } else {
            console.log('update estatus', e.target.value)
            updateFormData(name, parseInt(e.target.value));
        }
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select className={multiple ? "select-multiple" : ""} multiple={multiple} disabled={disabled} value={values} name={name} onChange={selectorChangeHandler}>
                <option value={87}>Activo</option>
                <option value={88}>Inactivo</option>
                <option value={89}>Baja</option>
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputStatusEmployee;