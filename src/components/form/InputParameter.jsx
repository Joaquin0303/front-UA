import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import '../../styles/Modal.css';

const InputParameter = ({ name, value, parameterList, disabled, updateFormData }) => {
    console.log(name, value);

    const paramSelectorChangeHandler = (e) => {
        console.log(name, ' selected=', e.target.value);
        updateFormData(name, e.target.value);
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value} name={name} onChange={paramSelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {parameterList && parameterList.map((p, i) => {
                    return <option key={i} value={p.id}>{p.descripcion}</option>
                })}
            </select>
        </div>
    );
}

export default InputParameter;