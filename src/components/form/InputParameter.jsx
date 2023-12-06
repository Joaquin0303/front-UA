import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import '../../styles/Modal.css';

const InputParameter = ({ name, value, parameterList, disabled, updateFormData }) => {

    const paramSelectorChangeHandler = (e) => {
        console.log(name, ' selected=', e.target.value);
        updateFormData(name, {
            id: e.target.value
        });
    }
    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value.id} name={name} onChange={paramSelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {parameterList && parameterList.map((p, i) => {
                    return <option key={i} value={p.id}>{p.descripcion}</option>
                })}
            </select>
        </div>
    );
}

export default InputParameter;