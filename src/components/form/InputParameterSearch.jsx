import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import '../../styles/Modal.css';

const InputParameterSearch = ({ validation, name, value, valueName, parameterList, disabled, updateFormData, country }) => {

    const fieldDescription = valueName ? valueName : "descripcion";

    const [fieldValue, setFieldValue] = useState(value && value.id > 0 ? value.codigo + ' - ' + value[fieldDescription] : '')

    const parameterListByCountry = !country ? parameterList : parameterList.filter(p => p.texto1 == country.codigo);

    const handleOnBlur = (e) => {
        if (!value || value.id == 0)
            setFieldValue('');
        else
            setFieldValue(value.descripcion);
    }

    const paramSelectorChangeHandler = (e) => {
        setFieldValue(e.target.value);
        const value = parameterListByCountry.find(p => e.target.value.indexOf(p[fieldDescription]) >= 0);
        if (value && value.id > 0) {
            updateFormData(name, {
                id: value.id
            });
        } else {
            updateFormData(name, null);
        }
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input onBlur={handleOnBlur} disabled={disabled} list={name + "data-list"} type="text" name={name} value={fieldValue} onChange={paramSelectorChangeHandler} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id={name + "data-list"}>
                {parameterListByCountry && parameterListByCountry.map((p, i) => {
                    const v = p[fieldDescription]
                    return <option key={i} value={v}></option>
                })}
            </datalist>
        </div>
    );
}

export default InputParameterSearch;