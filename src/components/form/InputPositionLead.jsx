import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
import { stringToInteger } from "../../utils/Utils";

const InputPositionLead = ({ validation, name, value, updateFormData, category, fieldUpdated, currentPositionId }) => {

    const [fieldValue, setFieldValue] = useState(value && value.id > 0 ? value.descripcion : '')
    const [positionFilteredList, setPositionFilteredList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    useEffect(() => {
        setPositionFilteredList(positionList.filter(p => !category || stringToInteger(p.codigoCategoria.texto2, 0) <= stringToInteger(category.texto2, 0)));
    }, [category, positionList]);

    const handleOnBlur = (e) => {
        if (!value || value.id == 0)
            setFieldValue('');
        else
            setFieldValue(value.descripcion);
    }

    const handleOnChange = (e) => {
        setFieldValue(e.target.value);
        const positionSelected = positionList.filter(p => p.descripcion.toLowerCase() == e.target.value.toLowerCase());
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

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input onBlur={handleOnBlur} autoComplete="off" list="position-data-list" type="text" name={name} value={fieldValue} onChange={handleOnChange} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id="position-data-list">
                {positionFilteredList && positionFilteredList.map((p, i) => {
                    return <option key={i} value={p.descripcion}></option>
                })}
            </datalist>
        </div>
    )
}

export default InputPositionLead;