import React, { useState, useEffect } from 'react';
import { getPermissions, editPermission, addPermission, removePermission } from '../services/PermissionServices';
import ABMPage from './ABMPage';

const PermissionModel = {
    descripcion: '',
    activo: true
}

export const Permisos = () => {
    const [permissionList, setPermissionList] = useState([]);

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = () => {
        getPermissions().then(result => {
            setPermissionList(result.list);
        });
    }

    const onAdd = (data) => {
        addPermission(data.descripcion, data.activo).then(result => {
            console.log('saved=', result);
            loadPermissions();
        });
    }

    const onEdit = (data) => {
        editPermission(data.id, data.descripcion, data.activo).then(result => {
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

    return (
        <ABMPage pageName="Permisos" dataList={permissionList} dataModel={PermissionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' />
    );
};