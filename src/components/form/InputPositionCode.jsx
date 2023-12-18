import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
const InputPositionCode = ({ name, value, disabled, updateFormData, directionCode, countryCode, categoryCode, currentPositionId }) => {

    const [positionList, setPositionList] = useState([]);
    const [positionListFiltered, setPositionListFiltered] = useState([]);

    const posSelectorChangeHandler = (e) => {
        const positionSelected = positionList.find(p => p.id == e.target.value);
        if (positionSelected)
            updateFormData(name, positionSelected);
        else
            updateFormData(name, {
                id: 0,

            });
    }

    useEffect(() => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == true && (!currentPositionId || d.id != currentPositionId)));
        });
    }, []);

    useEffect(() => {
        if (directionCode || countryCode || categoryCode) {
            setPositionListFiltered(positionList.filter(d =>
                d.activo == true
                && (!currentPositionId || d.id != currentPositionId)
                && (!directionCode || directionCode.id == 0 || d.codigoDireccion?.id == directionCode.id)
                && (!countryCode || countryCode.id == 0 || d.codigoPais?.id == countryCode.id)
                && (!categoryCode || categoryCode.id == 0 || d.codigoCategoria?.id == categoryCode.id)
            ));
        } else {
            setPositionListFiltered([]);
        }
    }, [directionCode, countryCode, categoryCode, positionList]);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <select disabled={disabled} value={value ? value.id : 0} name={name} onChange={posSelectorChangeHandler}>
                <option value={0}>(seleccione)</option>
                {positionListFiltered.map((s, i) => {
                    return <option key={i} value={s.id}>{s.descripcion}</option>
                })}
            </select>
        </div>
    );
}

export default InputPositionCode;