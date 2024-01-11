import axios from 'axios'
import { host } from '../Configs';

export const getExternals = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleadoexterno'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getExternalById = async (externalId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleadoexterno/' + externalId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateExternal = async (externalId, externalData) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/empleadoexterno/' + externalId,
        data: externalData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addExternal = async (externalData) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/empleadoexterno',
        data: externalData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeExternal = async (externalId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/empleadoexterno/' + externalId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getNextFileNumber = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleadoexterno/siguientelegajo'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}
