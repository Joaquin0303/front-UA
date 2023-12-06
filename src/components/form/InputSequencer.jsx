import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getSequencers } from "../../services/SequencerServices";

const InputSequencer = ({ name, value, disabled, updateFormData }) => {

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
            <select disabled={disabled} name={name} onChange={seqSelectorChangeHandler}>
                {sequencerList.map((s, i) => {
                    return <option key={i} selected={s.id == value.id} value={s.id}>{s.codigo}</option>
                })}
            </select>
        </div>
    );
}


export default InputSequencer;