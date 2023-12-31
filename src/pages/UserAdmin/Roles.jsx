import React, { useState, useEffect } from 'react';
import { getRoles, updateRole, addRole, assignPermissionToRole, getRoleById, removeRole } from '../../services/RoleServices';
import ABMPage from '../ABMPage';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const RoleModel = {
    descripcion: '',
    activo: true,
    permisos: null,
    usuarios: null,
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
            'descripcion',
            'permisos'
        ],
        inactiveRows: [
            'descripcion',
            'permisos'
        ]
    },
    formConfiguration: {
        activeFields: [
            'descripcion',
            'permisos'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'descripcion',
            'permisos'
        ],
        inactiveFields: [
            'descripcion',
            'permisos'
        ]
    }
}

const Roles = () => {
    const [roleList, setRoleList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadRoles();
    }, [statusActive]);

    const loadRoles = () => {
        getRoles().then(result => {
            if (result.list)
                setRoleList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addRole(data.descripcion, data.activo).then(result => {
            console.log('role saved=', result);
            data.permisos && data.permisos.forEach(permissionRole => {
                assignPermissionToRole(result.model.codigo, permissionRole.id).then(result => {
                    console.log('role permission saved=', result);
                    loadRoles();
                });
            });

        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateRole(data.codigo, data.descripcion, data.activo).then(result => {
            console.log('role edited=', result);
            data.permisos && data.permisos.forEach(permissionRole => {
                assignPermissionToRole(result.model.codigo, permissionRole.id).then(result => {
                    console.log('role permission saved=', result);
                    loadRoles();
                });
            });
        });
    }

    const onRemove = (data) => {
        removeRole(data.codigo).then(result => {
            console.log('removed=', result);
            loadRoles();
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
        if (!data.permisos || data.permisos.length <= 0) {
            result.error = true;
            result.validation.permisos = "Seleccione al menos un permiso"
        }
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="Roles" dataList={roleList} dataModel={RoleModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default Roles;