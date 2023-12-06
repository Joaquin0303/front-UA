import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getParameterTypes } from "../../services/ParameterTypeServices";

const InputParameterType = ({ name, value, disabled, updateFormData }) => {

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
            <select disabled={disabled} name={name} onChange={paramTypeSelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {parameterTypeList.map((s, i) => {
                    return <option key={i} selected={s.id == value.id} value={s.id}>{s.descripcion}</option>
                })}
            </select>
        </div>
    )
}

export default InputParameterType;