import axios from 'axios'

const context = 'http://localhost:8080';
//const context = '';

export const getRoles = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/rol'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateRole = async (roleId, descripcion, activo, permisos, usuarios) => {
    const result = await axios({
        method: 'put',
        url: context + '/ua/rol/' + roleId,
        data: {
            'descripcion': descripcion,
            'activo': activo,
            'permisos': permisos,
            'usuarios': usuarios
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
        url: context + '/ua/rol',
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
        url: context + '/ua/rol/usuario',
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
        url: context + '/ua/rol/permiso',
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
        url: context + '/ua/rol/' + roleId
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
        url: context + '/ua/rol/' + roleId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}