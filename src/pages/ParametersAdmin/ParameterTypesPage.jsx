import React, { useState, useEffect } from 'react';
import { getParameterTypes, addParameterType, updateParameterType, removeParameterType } from '../../services/ParameterTypeServices';
import ABMPage from '../ABMPage';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const ParameterTypeModel = {
    codigo: '',
    descripcion: '',
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'codigo',
        type: 'string'
    },
    {
        fieldName: 'descripcion',
        type: 'string'
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
                TABLE_ACTIONS.EDIT
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW
            ],
        },
        activeRows: [
            'descripcion'
        ],
        inactiveRows: [
            'descripcion'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'descripcion'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'descripcion'
        ],
        inactiveFields: [
            'descripcion'
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

const ParameterTypesPage = () => {
    const [parameterTypeList, setParameterTypeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadParameterTypes();
    }, [statusActive]);

    const loadParameterTypes = () => {
        getParameterTypes().then(result => {
            if (result.list)
                setParameterTypeList(result.list.filter(d => d.activo == statusActive).sort(compare));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addParameterType(data.codigo, data.descripcion, data.activo).then(result => {
            loadParameterTypes();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateParameterType(data.id, data.codigo, data.descripcion, data.activo).then(result => {
            loadParameterTypes();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onRemove = (data) => {
        removeParameterType(data.id).then(result => {
            loadParameterTypes();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
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
        if (!data.descripcion?.trim()) {
            result.error = true;
            result.validation.descripcion = "Ingrese descripción"
        }
        if (parameterTypeList.find(pt => pt.descripcion.toLowerCase() == data.descripcion.toLowerCase() && pt.id != data.id)) {
            result.error = true;
            result.validation.descripcion = "Ya existe un tipo de parámetro con este nombre"
        }

        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="parameterType" dataList={parameterTypeList} dataModel={ParameterTypeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default ParameterTypesPage;