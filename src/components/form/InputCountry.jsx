import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getCountries } from "../../services/CountryServices";

const InputCountry = ({ multiple, validation, name, value, disabled, updateFormData }) => {

    const [countryList, setCountryList] = useState([]);

    const countrySelectorChangeHandler = (e) => {
        if (multiple) {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            updateFormData(name, values);
        } else {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            updateFormData(name, values);
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
            <select className={multiple ? "select-multiple" : ""} multiple={multiple} disabled={disabled} value={value} default={multiple ? value : value ? value.id : 0} name={name} onChange={countrySelectorChangeHandler}>
                {!multiple && <option disabled className='default' value={0}>Pais</option>}
                {countryList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputCountry;