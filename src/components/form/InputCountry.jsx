import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getCountries } from "../../services/CountryServices";

const InputCountry = ({ name, value, disabled, updateFormData }) => {

    const [countryList, setCountryList] = useState([]);

    const countrySelectorChangeHandler = (e) => {
        updateFormData(name, {
            id: e.target.value
        });
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
            <select disabled={disabled} value={value ? value.id : 0} name={name} onChange={countrySelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {countryList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
        </div>
    );
}


export default InputCountry;