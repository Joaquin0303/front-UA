import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPositions } from "../../services/PositionServices";

const InputPositionLead = ({ validation, name, value, updateFormData, fieldUpdated, currentPositionId }) => {

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

    useEffect(() => {
        if (fieldUpdated && fieldUpdated.key == 'codigoCategoria') {
            if (fieldUpdated.value.id == 24) {
                setFilter([...filter, {
                    key: 'codigoDireccion',
                    value: {
                        id: 81
                    },
                    source: 'codigoCategoria'
                }]);
            } else {
                setFilter(filter.filter(f => !f.source || f.source != 'codigoCategoria'));
            }
            updateFormData(name, {
                id: 0,
            });
            setFieldValue('');
        } else if (fieldUpdated && fieldUpdated.key == 'codigoDireccion') {
            if (!filter || filter.length == 0) {
                setFilter([fieldUpdated]);
            } else {
                const dirFilter = filter.find(f => !f.source || f.source != 'codigoCategoria');
                if (!dirFilter) {
                    setFilter([...filter, fieldUpdated]);
                } else {
                    dirFilter.value = fieldUpdated.value;
                    setFilter([...filter]);
                }
            }
            updateFormData(name, {
                id: 0,
            });
            setFieldValue('');
        }
    }, [fieldUpdated]);

    useEffect(() => {
        setPositionListFiltered(positionList.filter(d => {
            let filtersToApplay = filter.filter(f => f.source == 'codigoCategoria');
            if (filtersToApplay.length == 0) filtersToApplay = filter;

            return d.activo == true
                && (!currentPositionId || d.id != currentPositionId)
                && filtersToApplay.find(f => f.value.id == d[f.key].id);
        }
        ));
    }, [filter]);

    useEffect(() => {
        if (value && value.id > 0) {
            setPositionListFiltered(positionList.filter(d =>
                d.activo == true
                && (!currentPositionId || d.id != currentPositionId)
                && d.codigoDireccion.id == value.codigoDireccion.id
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

export default InputPositionLead;