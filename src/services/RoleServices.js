import axios from 'axios'
import { host } from '../Configs';

export const getRoles = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/rol'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateRole = async (roleId, descripcion, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/rol/' + roleId,
        data: {
            'descripcion': descripcion,
            'activo': activo,
            'permisos': [],
            'usuarios': []
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addRole = async (descripcion, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/rol',
        data: {
            'descripcion': descripcion,
            'activo': activo,
            'permisos': [],
            'usuarios': []
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const assignRoleToUser = async (codigo, userId) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/rol/usuario',
        data: {
            'codigo': codigo,
            'id': userId
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const assignPermissionToRole = async (codigoRol, codigoPermiso) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/rol/permiso',
        data: {
            'codigoRol': codigoRol,
            'codigoPermiso': codigoPermiso
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getRoleById = async (roleId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/rol/' + roleId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeRole = async (roleId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/rol/' + roleId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}