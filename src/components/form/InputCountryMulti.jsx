import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getCountries } from "../../services/CountryServices";

const InputCountryMulti = ({ multiple, validation, name, values, disabled, updateFormData }) => {

    const [countryList, setCountryList] = useState([]);

    const countrySelectorChangeHandler = (e) => {
        if (multiple) {
            const v = parseInt(e.target.value);
            const index = values.indexOf(v);
            if (index >= 0) {
                values.splice(index, 1);
            } else {
                values.push(v);
            }
            updateFormData(name, values);
        } else {
            updateFormData(name, parseInt(e.target.value));
        }
    }

    useEffect(() => {
        getCountries().then(result => {
            if (result.list)
                setCountryList(result.list.filter(d => d.activo == true));
        })
    }, []);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select className={multiple ? "select-multiple" : ""} multiple={multiple} disabled={disabled} value={values} name={name} onChange={countrySelectorChangeHandler}>
                {countryList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputCountryMulti;