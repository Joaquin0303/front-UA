import React, { useState, useEffect } from 'react';
import { getRoles, updateRole, addRole, assignRoleToUser, assignPermissionToRole, getRoleById, removeRole } from '../services/RoleServices';
import ABMPage from './ABMPage';

const UserModel = {
    codigo: '',
    descripcion: '',
    activo: true,
    permisos: null,
    usuarios: null,
}

const Roles = () => {
    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = () => {
        getRoles().then(result => {
            setRoleList(result.list);
        });
    }

    const onAdd = (data) => {
        addRole(data.descripcion, data.activo).then(result => {
            console.log('saved=', result);
            loadRoles();
        });
    }

    const onEdit = (data) => {
        updateRole(data.codigo, data.descripcion, data.activo, data.permisos, data.usuarios).then(result => {
            console.log('edited=', result);
            loadRoles();
        });
    }

    const onRemove = (data) => {
        removeRole(data.codigo).then(result => {
            console.log('removed=', result);
            loadRoles();
        });
    }

    return (
        <ABMPage pageName="Roles" dataList={roleList} dataModel={UserModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' />
    );
}

export default Roles;