import axios from 'axios'
import { host } from '../Configs';

export const getParameterTypes = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/tipoparametro'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getParameterTypeById = async (parameterTypeId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/tipoparametro/' + parameterTypeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}


export const updateParameterType = async (parameterTypeId, codigo, descripcion, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/tipoparametro/' + parameterTypeId,
        data: {
            'descripcion': descripcion,
            'activo': activo,
            'codigo': codigo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addParameterType = async (codigo, descripcion, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/tipoparametro',
        data: {
            'descripcion': descripcion,
            'activo': activo,
            'codigo': codigo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeParameterType = async (parameterTypeId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/tipoparametro/' + parameterTypeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}