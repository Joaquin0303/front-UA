import axios from 'axios'
import { host } from '../Configs';

export const getPermissions = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/permiso'
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
        url: host + '/ua/permiso',
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
        url: host + '/ua/permiso/' + permissionId
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
        url: host + '/ua/permiso/' + permissionId
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
        url: host + '/ua/permiso/' + permissionId,
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
        url: host + '/ua/permiso/buscar?'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}
