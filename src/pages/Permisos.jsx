import React, { useState, useEffect } from 'react';
import { getPermissions, editPermission, addPermission, removePermission } from '../services/PermissionServices';
import ABMPage from './ABMPage';

const PermissionModel = {
    descripcion: '',
    activo: true
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

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    return (
        <ABMPage pageName="Permisos" dataList={permissionList} dataModel={PermissionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} />
    );
};