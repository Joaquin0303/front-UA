import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import '../../styles/Modal.css';

const InputParameter = ({ validation, name, value, valueName, parameterList, disabled, updateFormData, country }) => {

    const fieldDescription = valueName ? valueName : "descripcion";

    const parameterListByCountry = !country ? parameterList : parameterList.filter(p => p.texto1 == country.codigo);

    const paramSelectorChangeHandler = (e) => {
        if (e.target.value > 0) {
            updateFormData(name, parameterListByCountry.find(p => p.id == e.target.value));
        } else {
            updateFormData(name, null);
        }
    }
    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value.id : 0} name={name} onChange={paramSelectorChangeHandler}>
                <option disabled className='default' value={0}></option>
                {parameterListByCountry && parameterListByCountry.map((p, i) => {
                    return <option key={i} value={p.id}>{p[fieldDescription]}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}

export default InputParameter;