import React, { useState, useEffect } from 'react';
import { getPermissions, updatePermission, addPermission, removePermission } from '../../services/PermissionServices';
import ABMPage from '../ABMPage';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const PermissionModel = {
    descripcion: '',
    activo: true
}

const pageConfiguration = {
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
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
        addPermission(data.descripcion, data.activo).then(result => {
            console.log('saved=', result);
            loadPermissions();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePermission(data.id, data.descripcion, data.activo).then(result => {
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