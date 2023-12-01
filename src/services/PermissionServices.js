import axios from 'axios'

const context = 'http://localhost:8080';

export const getPermissions = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/permiso'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPermission = async (descripcion, activo) => {
    const result = await axios({
        method: 'post',
        url: context + '/ua/permiso',
        data: {
            'descripcion': descripcion,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removePermission = async (permissionId) => {
    const result = await axios({
        method: 'delete',
        url: context + '/ua/permiso/' + permissionId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getPermissionById = async (permissionId) => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/permiso/' + permissionId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const editPermission = async (permissionId, descripcion, activo) => {
    const result = await axios({
        method: 'put',
        url: context + '/ua/permiso/' + permissionId,
        data: {
            'descripcion': descripcion,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const SearchPermission = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/permiso/buscar?'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}
