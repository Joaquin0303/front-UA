import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getSequencers } from "../../services/SequencerServices";

const InputSequencer = ({ validation, name, value, disabled, updateFormData }) => {

    const [sequencerList, setSequencerList] = useState([]);

    const seqSelectorChangeHandler = (e) => {
        updateFormData(name, {
            id: e.target.value
        });
    }

    useEffect(() => {
        getSequencers().then(result => {
            if (result.list)
                setSequencerList(result.list.filter(d => d.activo == true));
        })
    }, []);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value.id : 0} name={name} onChange={seqSelectorChangeHandler}>
                <option value={0}>(Seleccione)</option>
                {sequencerList.map((s, i) => {
                    return <option key={i} value={s.id}>{s.codigo}</option>
                })}
            </select>
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
        </div>
    );
}


export default InputSequencer;