import React, { useState, useEffect } from 'react';
import { getPositions, addPosition, updatePosition, removePosition } from '../../services/PositionServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const PositionModel = {
    descripcion: '',
    codigoPais: {
        id: 0
    },
    codigoDireccion: {
        id: 0
    },
    codigoGerencia: {
        id: 0
    },
    codigoCentroDeCosto: {
        id: 0
    },
    codigoJefatura: {
        id: 0
    },
    codigoCategoria: {
        id: 0
    },
    codigoPuestoAlQueReporta: {
        id: 0
    },
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'descripcion',
        type: 'string'
    },
    {
        fieldName: 'codigoPais',
        type: 'country'
    },
    {
        fieldName: 'codigoDireccion',
        type: 'parameter',
        code: 6
    },
    {
        fieldName: 'codigoGerencia',
        type: 'parameter.search',
        code: 12
    },
    {
        fieldName: 'codigoCentroDeCosto',
        type: 'parameter',
        code: 4
    },
    {
        fieldName: 'codigoJefatura',
        type: 'parameter.search',
        code: 14
    },
    {
        fieldName: 'codigoCategoria',
        type: 'parameter',
        code: 3
    },
    {
        fieldName: 'codigoPuestoAlQueReporta',
        type: 'leaderPosition'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const pageConfiguration = {
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.EDIT,
                TABLE_ACTIONS.INACTIVATE
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.ACTIVATE,
            ],
        },
        activeRows: [
            'codigoCentroDeCosto',
            'descripcion',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoCategoria',
            'codigoPuestoAlQueReporta',
            'codigoPais'
        ],
        inactiveRows: [
            'codigoCentroDeCosto',
            'descripcion',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoCategoria',
            'codigoPuestoAlQueReporta',
            'codigoPais'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'codigoCentroDeCosto',
            'descripcion',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoCategoria',
            'codigoPuestoAlQueReporta',
            'codigoPais'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'codigoCentroDeCosto',
            'descripcion',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoCategoria',
            'codigoPuestoAlQueReporta',
            'codigoPais'
        ],
        inactiveFields: [
            'codigoCentroDeCosto',
            'descripcion',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'codigoCategoria',
            'codigoPuestoAlQueReporta',
            'codigoPais'
        ]
    }
}

const compare = (a, b) => {
    if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
    }
    if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return 1;
    }
    return 0;
}

const PositionsPage = () => {
    const [positionList, setPositionList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadPositions();
    }, [statusActive]);

    const loadPositions = () => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == statusActive).sort(compare));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPosition(data.codigoPais, data.descripcion, data.codigoDireccion, data.codigoCentroDeCosto, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
            console.log('saved=', result);
            loadPositions();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePosition(data.id, data.codigoPais, data.descripcion, data.codigoDireccion, data.codigoCentroDeCosto, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
            console.log('edited=', result);
            loadPositions();
        });
    }

    const onRemove = (data) => {
        removePosition(data.id).then(result => {
            console.log('removed=', result);
            loadPositions();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.codigoDireccion || data.codigoDireccion.id <= 0) {
            result.error = true;
            result.validation.codigoDireccion = "Seleccione código de dirección"
        }
        if (!data.descripcion?.trim()) {
            result.error = true;
            result.validation.descripcion = "Ingrese descripción"
        }
        if (!data.codigoCategoria || data.codigoCategoria.id <= 0) {
            result.error = true;
            result.validation.codigoCategoria = "Seleccione código de categoría"
        }
        if (!data.codigoCentroDeCosto || data.codigoCentroDeCosto.id <= 0) {
            result.error = true;
            result.validation.codigoCentroDeCosto = "Seleccione código de centro de costo"
        }
        if (!data.codigoPais || data.codigoPais.id <= 0) {
            result.error = true;
            result.validation.codigoPais = "Seleccione un pais"
        }

        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="Puesto" dataList={positionList} dataModel={PositionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default PositionsPage;