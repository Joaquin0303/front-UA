import axios from 'axios'
import { host } from '../Configs';

export const loginUser = async (credentials) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(credentials)
    }).then(response => {
        if (response.data.codigo == 200) {
            return response.data.model;
        } else {
            throw response.data.mensajes[0];
        }

    }).catch(error => {
        console.error(error);
        throw error;
    })
    return result;
}

export const getUsers = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
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

export const editUser = async (userId, numeroLegajo, nombreUsuario, activo, roles, fechaAlta) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/usuario/' + userId,
        data: {
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario,
            'activo': activo,
            'roles': roles,
            'fechaAlta': fechaAlta
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addUser = async (numeroLegajo, nombreUsuario, activo, roles) => {
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
            'roles': roles
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
