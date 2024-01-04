import React from "react";
import i18n from "../../localization/i18n";

const InputActiveSelect = ({ name, value, updateFormData }) => {

    return (
        <>
            <div className='form-group'>
                <label className='label' htmlFor="id">{i18n.t(name)}</label>
                <select value={value} name={name} onChange={(e) => updateFormData(name, e.target.value)}>
                    <option disabled className='default' value={0}>{i18n.t(name)}</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                </select>
            </div>
        </>
    )
}

export default InputActiveSelect;