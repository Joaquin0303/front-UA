import React, { useState, useEffect } from 'react';
import { getExcludedIncomes, addExcludedIncome, updateExcludedIncome, removeExcludedIncome } from '../../services/ExcludedIncomeServices';
import ABMPage from '../ABMPage';

const ExcludedIncomeModel = {
    motivo: '',
    empleado: {
        id: 0
    },
    observaciones: '',
    activo: true
}

const ExcludedIncomePage = () => {
    const [excludedIncomeList, setExcludedIncomeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadExcludedIcomes();
    }, [statusActive]);

    const loadExcludedIcomes = () => {
        getExcludedIncomes().then(result => {
            if (result.list)
                setExcludedIncomeList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addExcludedIncome(data.employee, data.motivo, data.observaciones, data.activo).then(result => {
            console.log('saved=', result);
            loadExcludedIcomes();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateExcludedIncome(data.id, data.employee, data.motivo, data.observaciones, data.activo).then(result => {
            console.log('edited=', result);
            loadExcludedIcomes();
        });
    }

    const onRemove = (data) => {
        removeExcludedIncome(data.id).then(result => {
            console.log('removed=', result);
            loadExcludedIcomes();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.empleado.numeroLegajo == lowerCaseSearchTerm || (data.empleado.nombre + data.empleado.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        return result;
    }

    return (
        <ABMPage pageName="ingresoCaido" dataList={excludedIncomeList} dataModel={ExcludedIncomeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default ExcludedIncomePage;