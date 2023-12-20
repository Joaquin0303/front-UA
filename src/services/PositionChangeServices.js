import axios from 'axios'
import { host } from '../Configs';

export const getPositionChanges = async () => {
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

export const getPositionChangeById = async (positionChangeId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleadoexterno/' + positionChangeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePositionChange = async (positionChangeId, positionChangeData) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/empleadoexterno/' + positionChangeId,
        data: positionChangeData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPositionChange = async (positionChangeData) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/empleadoexterno',
        data: positionChangeData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removePositionChange = async (positionChangeId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/empleadoexterno/' + positionChangeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}