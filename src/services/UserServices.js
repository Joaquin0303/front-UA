import axios from 'axios'

const context = 'http://localhost:8080';

export const getUsers = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/usuario'
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
        url: context + '/ua/usuario/' + userId
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
        url: context + '/ua/usuario/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const editUser = async (userId, numeroLegajo, nombreUsuario) => {
    const result = await axios({
        method: 'put',
        url: context + '/ua/usuario/' + userId,
        data: {
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addUser = async (numeroLegajo, nombreUsuario, activo) => {
    const result = await axios({
        method: 'post',
        url: context + '/ua/usuario',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario,
            'activo': activo
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
        url: context + '/ua/usuario/buscar?'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}
