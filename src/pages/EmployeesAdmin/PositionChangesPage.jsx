import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getPositionChanges, addPositionChange, updatePositionChange, removePositionChange } from '../../services/PositionChangeServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const PositionChangeModel = {
    activo: true
}

const pageConfiguration = {
    show_search: true,
    show_add_button: false,
    show_active_button: true,
    tableConfiguration: {
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW
            ],
        },
        activeRows: [
            'numeroLegajo',
            'nombreEmpleado',
            'codigoPais',
            'codigoDireccion',
            'codigoPuesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ],
        inactiveRows: [
        ],
        aditionalRows: [
            'nombreEmpleado'
        ],
        sortRow: [
            'numeroLegajo',
            'nombreEmpleado',
            'codigoPais',
            'codigoDireccion',
            'codigoPuesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ]
    },
    formConfiguration: {
        activeFields: [
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'codigoPais',
            'codigoOficina',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoPuesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ],
        inactiveFields: [
            'numeroLegajo',
            'codigoPais',
            'codigoOficina',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoPuesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ]
    }
}

const PositionChangesPage = () => {
    const [positionChangeList, setPositionChangeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadPositionChanges();
    }, [statusActive]);

    const loadPositionChanges = () => {
        getPositionChanges().then(result => {
            if (result.list)
                setPositionChangeList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPositionChange(data).then(result => {
            console.log('saved=', result);
            loadPositionChanges();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePositionChange(data.id, data).then(result => {
            console.log('edited=', result);
            loadPositionChanges();
        });
    }

    const onRemove = (data) => {
        removePositionChange(data.id).then(result => {
            console.log('removed=', result);
            loadPositionChanges();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return !searchTerm || data.numeroLegajo == lowerCaseSearchTerm;
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="cambioDePuesto" dataList={positionChangeList} dataModel={PositionChangeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default PositionChangesPage;