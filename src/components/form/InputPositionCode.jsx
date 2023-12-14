import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
const InputPositionCode = ({ name, value, disabled, updateFormData, directionCode, currentPositionId }) => {

    const [positionList, setPositionList] = useState([]);
    const [positionListFiltered, setPositionListFiltered] = useState([]);

    const posSelectorChangeHandler = (e) => {
        updateFormData(name, {
            id: e.target.value
        });
    }

    useEffect(() => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == true && (!currentPositionId || d.id != currentPositionId)));
        });
    }, []);

    useEffect(() => {
        if (directionCode) {
            setPositionListFiltered(positionList.filter(d => d.activo == true && (!currentPositionId || d.id != currentPositionId) && d.codigoDireccion.id == directionCode.id));
        } else {
            setPositionListFiltered([]);
        }
    }, [directionCode, positionList]);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value : 0} name={name} onChange={posSelectorChangeHandler}>
                <option value={0}>(seleccione)</option>
                {positionListFiltered.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
        </div>
    );
}

export default InputPositionCode;