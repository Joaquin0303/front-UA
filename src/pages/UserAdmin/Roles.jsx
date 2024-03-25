import React, { useState, useEffect } from 'react';
import { getRoles, updateRole, addRole, assignPermissionToRole, getRoleById, removeRole } from '../../services/RoleServices';
import ABMPage from '../ABMPage';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const RoleModel = {
    descripcion: '',
    activo: true,
    permisos: null
}

const ModelDefinition = [
    {
        fieldName: 'descripcion',
        type: 'string'
    },
    {
        fieldName: 'permisos',
        type: 'permission'
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
            'descripcion',
            'permisos'
        ],
        inactiveRows: [
            'descripcion',
            'permisos'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
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
            data.permisos && data.permisos.forEach(permissionRole => {
                assignPermissionToRole(result.model.codigo, permissionRole.id).then(result => {
                    loadRoles();
                });
            });
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onEdit = (data, action) => {
        switch (action) {
            case TABLE_ACTIONS.INACTIVATE:
                updateRole(data.codigo, data.descripcion, data.activo).then(result => {
                    loadRoles();

                });
                break;
            case TABLE_ACTIONS.ACTIVATE:
                updateRole(data.codigo, data.descripcion, data.activo).then(result => {
                    loadRoles();
                });
                break;
            default:
                const validation = validate(data);
                if (validation.error) throw validation;
                updateRole(data.codigo, data.descripcion, data.activo).then(result => {
                    data.permisos && data.permisos.forEach(permissionRole => {
                        assignPermissionToRole(result.model.codigo, permissionRole.id).then(result => {
                            loadRoles();
                        });
                    });
                }).catch(error => {
                    alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
                });
        }
    }

    const onRemove = (data) => {
        removeRole(data.codigo).then(result => {
            loadRoles();
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