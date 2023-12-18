import React, { useState, useEffect } from 'react';
import { getRoles, updateRole, addRole, assignPermissionToRole, getRoleById, removeRole } from '../services/RoleServices';
import ABMPage from './ABMPage';

const RoleModel = {
    descripcion: '',
    activo: true,
    permisos: null,
    usuarios: null,
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
        return result;
    }

    return (
        <ABMPage pageName="Roles" dataList={roleList} dataModel={RoleModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default Roles;