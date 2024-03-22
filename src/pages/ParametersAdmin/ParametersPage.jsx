import React, { useState, useEffect } from 'react';
import { getParameters, addParameter, updateParameter, removeParameter } from '../../services/ParameterServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const ParameterModel = {
    codigo: '',
    tipoParametro: {
        id: 0
    },
    descripcion: '',
    texto1: '',
    texto2: '',
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'codigo',
        type: 'string'
    },
    {
        fieldName: 'tipoParametro',
        type: 'parameterType'
    },
    {
        fieldName: 'descripcion',
        type: 'string'
    },
    {
        fieldName: 'texto1',
        type: 'string'
    },
    {
        fieldName: 'texto2',
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
                TABLE_ACTIONS.EDIT,
                TABLE_ACTIONS.INACTIVATE
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.ACTIVATE,
            ],
        },
        activeRows: [
            'codigo',
            'tipoParametro',
            'descripcion',
            'texto1',
            'texto2'
        ],
        inactiveRows: [
            'codigo',
            'tipoParametro',
            'descripcion',
            'texto1',
            'texto2'
        ],
        sortRow: [
            'tipoParametro',
            'descripcion',
            'codigo',
            'texto1',
            'texto2'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'codigo',
            'tipoParametro',
            'descripcion',
            'texto1',
            'texto2'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'codigo',
            'tipoParametro',
            'descripcion',
            'texto1',
            'texto2'
        ],
        inactiveFields: [
            'codigo',
            'tipoParametro',
            'descripcion',
            'texto1',
            'texto2'
        ]
    }
}

const compare = (a, b) => {
    if (a.tipoParametro.descripcion.toLowerCase() < b.tipoParametro.descripcion.toLowerCase()) {
        return -1
    } else if (a.tipoParametro.descripcion.toLowerCase() > b.tipoParametro.descripcion.toLowerCase()) {
        return 1;
    } else {
        if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
            return -1;
        }
        if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
            return 1;
        }
        return 0;
    }
}

const ParametersPage = () => {
    const [parameterList, setParameterList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadParameters();
    }, [statusActive]);

    const loadParameters = () => {
        getParameters().then(result => {
            if (result.list)
                setParameterList(result.list.filter(d => d.activo == statusActive).sort(compare));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addParameter(data.codigo, data.tipoParametro, data.descripcion, data.texto1, data.texto2, data.activo).then(result => {
            loadParameters();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateParameter(data.id, data.tipoParametro, data.codigo, data.descripcion, data.texto1, data.texto2, data.activo).then(result => {
            loadParameters();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onRemove = (data) => {
        removeParameter(data.id).then(result => {
            loadParameters();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.tipoParametro?.descripcion?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.codigo?.trim()) {
            result.error = true;
            result.validation.codigo = "Ingrese código"
        }
        if (!data.descripcion?.trim()) {
            result.error = true;
            result.validation.descripcion = "Ingrese descripción"
        }
        if (!data.tipoParametro || data.tipoParametro.id <= 0) {
            result.error = true;
            result.validation.tipoParametro = "Seleccione tipo de parámetro"
        }
        if (parameterList.find(pt => pt.codigo.toLowerCase() == data.codigo.toLowerCase() && pt.id != data.id)) {
            result.error = true;
            result.validation.codigo = "Ya existe un parámetro con este codigo"
        }
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="Parametros" dataList={parameterList} dataModel={ParameterModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} setActive={setStatusActive} matchHandler={matchHandler} statusActive={statusActive} />
    );
}

export default ParametersPage;