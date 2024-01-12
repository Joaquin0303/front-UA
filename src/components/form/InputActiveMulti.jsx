import React from "react";
import i18n from "../../localization/i18n";

const InputActiveMulti = ({ name, values, updateFormData }) => {
    const selectorChangeHandler = (e) => {
        const v = parseInt(e.target.value)
        const index = values.indexOf(v);
        if (index >= 0) {
            values.splice(index, 1);
        } else {
            values.push(v);
        }
        updateFormData(name, values);
    }

    return (
        <>
            <div className='form-group'>
                <label className='label' htmlFor="id">{i18n.t(name)}</label>
                <select className="select-multiple" multiple={true} value={values} name={name} onChange={selectorChangeHandler}>
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                </select>
            </div>
        </>
    )
}

export default InputActiveMulti;