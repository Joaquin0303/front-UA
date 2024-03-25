import axios from 'axios'
import { host } from '../Configs';
import { searchEmployee } from './EmployeeServices';

export const getUsers = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario'
    }).then(response => {
        if (response) {
            let r = Promise.all(response.data.list.map(u => {
                u.empleado = searchEmployee(u.numeroLegajo).then(r => {
                    if (r && r.list)
                        return r.list.findLast(e => e.numeroLegajo == u.numeroLegajo);
                    else
                        return null;
                });
                return u;
            })).then(eu => {
                return eu;
            });
            return r;
        } else {
            return response;
        }
    }).catch(error => {
        throw error;
    })
    return result;
}

export const removeUser = async (userId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/usuario/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getUserById = async (userId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const editUser = async (userId, user) => {
    user.fechaBaja = user.activo ? null : new Date();
    const result = await axios({
        method: 'put',
        url: host + '/ua/usuario/' + userId,
        data: user
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addUser = async (numeroLegajo, nombreUsuario, activo, roles, contrasena) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/usuario',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario,
            'activo': activo,
            'roles': roles,
            'contrasena': contrasena
        })
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const SearchUser = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/buscar?'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePassword = async (userId, password) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/usuario/cambiarcontrasena/' + userId,
        data: {
            'contrasena': password
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const resetPassword = async (userId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/resetear/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const unblockUser = async (userId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/desbloquear/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}