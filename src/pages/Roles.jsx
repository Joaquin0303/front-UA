import React, { useState, useEffect } from 'react';
import { getRoles, updateRole, addRole, assignPermissionToRole, getRoleById, removeRole } from '../services/RoleServices';
import ABMPage from './ABMPage';

const UserModel = {
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

    return (
        <ABMPage pageName="Roles" dataList={roleList} dataModel={UserModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' setActive={setStatusActive} />
    );
}

export default Roles;