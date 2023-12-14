import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getParameterTypes } from "../../services/ParameterTypeServices";

const InputParameterType = ({ validation, name, value, disabled, updateFormData }) => {

    const [parameterTypeList, setParameterTypeList] = useState([]);

    const paramTypeSelectorChangeHandler = (e) => {
        updateFormData(name, {
            id: e.target.value
        });
    }

    useEffect(() => {
        getParameterTypes().then(result => {
            if (result.list)
                setParameterTypeList(result.list.filter(d => d.activo == true));
        })
    }, []);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value.id : 0} name={name} onChange={paramTypeSelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {parameterTypeList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    )
}

export default InputParameterType;