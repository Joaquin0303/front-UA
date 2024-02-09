import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
const InputPositionCode = ({ validation, name, value, disabled, updateFormData, directionCode, countryCode, categoryCode, currentPositionId, mandatory }) => {


    const [fieldValue, setFieldValue] = useState(value && value.id > 0 ? value.descripcion : '')

    const [positionList, setPositionList] = useState([]);
    const [positionListFiltered, setPositionListFiltered] = useState([]);

    const handleOnBlur = (e) => {
        if (!value || value.id == 0)
            setFieldValue('');
        else
            setFieldValue(value.descripcion);
    }

    const posSelectorChangeHandler = (e) => {
        setFieldValue(e.target.value);
        const positionSelected = positionList.filter(p => p.descripcion.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0);
        if (positionSelected && positionSelected.length == 1) {
            updateFormData(name, positionSelected[0]);
        } else {
            updateFormData(name, {
                id: 0,
            });
        }
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
            <label className='label' htmlFor="id">{i18n.t(name)}{mandatory && "*"}</label>
            <input onBlur={handleOnBlur} autoComplete="off" disabled={disabled} list="position-data-list" type="text" name={name} value={fieldValue} onChange={posSelectorChangeHandler} required={mandatory} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id="position-data-list">
                {positionListFiltered && positionListFiltered.map((p, i) => {
                    return <option key={i} value={p.descripcion}></option>
                })}
            </datalist>
        </div>
    );
}

export default InputPositionCode;