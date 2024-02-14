import React, { useState, useEffect } from 'react';
import { getPermissions, updatePermission, addPermission, removePermission } from '../../services/PermissionServices';
import ABMPage from '../ABMPage';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const PermissionModel = {
    descripcion: '',
    codigo: '',
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'descripcion',
        type: 'string'
    },
    {
        fieldName: 'codigo',
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
            'descripcion'
        ],
        inactiveRows: [
            'descripcion'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'descripcion',
            'codigo'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'descripcion',
            'codigo'
        ],
        inactiveFields: [
            'descripcion',
            'codigo'
        ]
    }
}

export const Permisos = () => {
    const [permissionList, setPermissionList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadPermissions();
    }, [statusActive]);

    const loadPermissions = () => {
        getPermissions().then(result => {
            if (result.list)
                setPermissionList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPermission(data.descripcion, data.codigo, data.activo).then(result => {
            console.log('saved=', result);
            loadPermissions();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePermission(data.id, data.descripcion, data.codigo, data.activo).then(result => {
            console.log('edited=', result);
            loadPermissions();
        });
    }

    const onRemove = (data) => {
        removePermission(data.id).then(result => {
            console.log('removed=', result);
            loadPermissions();
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
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="Permisos" dataList={permissionList} dataModel={PermissionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
};