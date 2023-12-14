import React, { useState, useEffect } from 'react';
import { getUsers, addUser, editUser, removeUser } from '../services/UserServices';
import { assignRoleToUser } from '../services/RoleServices';
import ABMPage from './ABMPage';

const UserModel = {
    numeroLegajo: '',
    nombreUsuario: '',
    roles: [],
    activo: true
}

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadUsers();
    }, [statusActive]);

    const loadUsers = () => {
        getUsers().then(result => {
            if (result.list)
                setUserList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addUser(data.numeroLegajo, data.nombreUsuario, data.activo, data.roles).then(result => {
            console.log('user saved=', result);
            data.roles && data.roles.forEach(userRole => {
                assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                    console.log('role user saved=', result);
                    loadUsers();
                });
            });
            if (!data.roles || data.roles.length == 0) {
                loadUsers();
            }
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        editUser(data.id, data.numeroLegajo, data.nombreUsuario, data.activo, data.roles).then(result => {
            console.log('user edited=', result);
            data.roles && data.roles.forEach(userRole => {
                assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                    console.log('role user saved=', result);
                    loadUsers();
                });
            });
            if (!data.roles || data.roles.length == 0) {
                loadUsers();
            }
        });
    }

    const onRemove = (data) => {
        removeUser(data.id).then(result => {
            console.log('removed=', result);
            loadUsers();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.nombreUsuario?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.nombreUsuario?.trim()) {
            result.error = true;
            result.validation.nombreUsuario = "Ingrese nombre de usuario"
        }
        if (!data.numeroLegajo?.trim()) {
            result.error = true;
            result.validation.numeroLegajo = "Ingrese numero de legajo"
        }
        return result;
    }

    return (
        <ABMPage pageName="Usuarios" dataList={userList} dataModel={UserModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} />
    );
}

export default Users;

