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
        loadUsers();
    }, []);

    const loadUsers = () => {
        getRoles().then(result => {
            setRoleList(result.list);
        });
    }

    return (
        <ABMPage pageName="Roles" dataList={roleList} dataModel={UserModel} searchKey='descripcion' />
    );
}

export default Roles;