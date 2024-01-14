import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";

const InputPosition = ({ validation, name, value, updateFormData, fieldUpdated, currentPositionId }) => {

    const [fieldValue, setFieldValue] = useState(value && value.id > 0 ? value.descripcion : '')

    const [positionList, setPositionList] = useState([]);
    const [positionListFiltered, setPositionListFiltered] = useState([]);
    const [filter, setFilter] = useState([]);

    const handleOnBlur = (e) => {
        if (!value || value.id == 0)
            setFieldValue('');
        else
            setFieldValue(value.descripcion);
    }

    const handleOnChange = (e) => {
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
        if (fieldUpdated && ['codigoDireccion', 'codigoCategoria', 'codigoPais'].indexOf(fieldUpdated.key) >= 0) {
            const f = filter.find(f => f.key == fieldUpdated.key)
            if (!f) {
                setFilter([...filter, fieldUpdated]);
            } else if (f && f.value.id != fieldUpdated.value.id) {
                f.value = fieldUpdated.value;
                setFilter([...filter]);
            }
            updateFormData(name, {
                id: 0,
            });
            setFieldValue('');
        }
    }, [fieldUpdated]);

    useEffect(() => {
        setPositionListFiltered(positionList.filter(d =>
            d.activo == true
            && filter.find(f => f.value.id == d[f.key].id)
        ));
    }, [filter]);

    useEffect(() => {
        if (value && value.id > 0) {
            setPositionListFiltered(positionList.filter(d =>
                d.activo == true
                && (!currentPositionId || d.id != currentPositionId)
                && d.codigoDireccion.id == value.codigoDireccion.id
                && d.codigoCategoria.id == value.codigoCategoria.id
                && d.codigoPais.id == value.codigoPais.id
            ));
        }
    }, [positionList]);

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input onBlur={handleOnBlur} autoComplete="off" list="position-data-list" type="text" name={name} value={fieldValue} onChange={handleOnChange} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id="position-data-list">
                {positionListFiltered && positionListFiltered.map((p, i) => {
                    return <option key={i} value={p.descripcion}></option>
                })}
            </datalist>
        </div>
    )
}

export default InputPosition;