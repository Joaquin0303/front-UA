import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
const InputPositionCode = ({ name, value, disabled, updateFormData }) => {

    const [positionList, setPositionList] = useState([]);

    const posSelectorChangeHandler = (e) => {
        updateFormData(name, e.target.value);
    }

    useEffect(() => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == true));
        });
    }, []);
    console.log('reporta', value)
    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value : 0} name={name} onChange={posSelectorChangeHandler}>
                <option value={0}>No</option>
                {positionList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
        </div>
    );
}

export default InputPositionCode;