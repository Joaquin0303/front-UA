import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getPositionChanges, addPositionChange, updatePositionChange, removePositionChange } from '../../services/PositionChangeServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const PositionChangeModel = {
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'numeroLegajo',
        type: 'string'
    },
    {
        fieldName: 'apellidoynombre',
        type: 'employee',
        employeeFields: ['apellido', 'nombre'],
        employee: "empleado"
    },
    {
        fieldName: 'codigoPais',
        type: 'country',
    },
    {
        fieldName: 'codigoDireccion',
        type: 'parameter'
    },
    {
        fieldName: 'codigoPuesto',
        type: 'position'
    },
    {
        fieldName: 'fechaIngresoReconocida',
        type: 'calendar'
    },
    {
        fieldName: 'fechaEgreso',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const pageConfiguration = {
    show_search: true,
    show_add_button: false,
    show_active_button: true,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
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
            'apellidoynombre',
            'codigoPais',
            'codigoDireccion',
            'codigoPuesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ],
        inactiveRows: [
        ],
        aditionalRows: [
            'apellidoynombre'
        ],
        sortRow: [
            'numeroLegajo',
            'apellidoynombre',
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
            if (result)
                setPositionChangeList(result.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPositionChange(data).then(result => {
            loadPositionChanges();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePositionChange(data.id, data).then(result => {
            loadPositionChanges();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onRemove = (data) => {
        removePositionChange(data.id).then(result => {
            loadPositionChanges();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
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