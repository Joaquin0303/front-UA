import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";
import { existsEmployeeWithPosition } from "../../services/EmployeeServices";

const InputPositionCode = ({ validation, name, value, disabled, updateFormData, directionCode, countryCode, currentPositionId, mandatory }) => {
    const [fieldValue, setFieldValue] = useState(value && value.id > 0 ? value.descripcion : '')
    const [firstLoad, setFirstLoad] = useState(true);
    const [positionList, setPositionList] = useState([]);
    const [positionListFiltered, setPositionListFiltered] = useState([]);
    const [originalPosition, setOriginalPosition] = useState(currentPositionId);

    const handleOnBlur = (e) => {
        if (!value || value.id == 0)
            setFieldValue('');
        else
            setFieldValue(value.descripcion);
    }

    const validateAndUpdatePosition = (position) => {
        if ((originalPosition == position.id) || !position.codigoCategoria.texto1 || (position.codigoCategoria.texto1 && position.codigoCategoria.texto1.toLowerCase() != 'si')) {
            updateFormData(name, position);
        } else {
            existsEmployeeWithPosition(position.id).then(response => {
                if (!response) {
                    updateFormData(name, position);
                } else {
                    updateFormData('position', false);
                }
            })
        }
    }

    useEffect(() => {
        if (!firstLoad)
            setFieldValue('');
        setFirstLoad(false);
    }, [directionCode, countryCode]);

    const posSelectorChangeHandler = (e) => {
        setFieldValue(e.target.value);
        updateFormData('position', null);
        const positionSelected = positionListFiltered.filter(p => p.descripcion.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0);

        if (positionSelected && positionSelected.length == 1) {
            validateAndUpdatePosition(positionSelected[0]);
        } else {
            updateFormData(name, {
                id: 0,
            });
        }
    }

    useEffect(() => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == true));
        });
    }, []);

    useEffect(() => {
        if (directionCode || countryCode) {
            setPositionListFiltered(positionList.filter(d =>
                d.activo == true
                && (!directionCode || directionCode.id == 0 || d.codigoDireccion?.id == directionCode.id)
                && (!countryCode || countryCode.id == 0 || d.codigoPais?.id == countryCode.id)
            ));
        } else {
            setPositionListFiltered([]);
        }
    }, [directionCode, countryCode, positionList]);

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