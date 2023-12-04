import axios from 'axios'
import { host } from '../Configs';

export const getParameters = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/parametro'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getParameterById = async (parameterId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/parametro/' + parameterId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateParameter = async (parameterId, tipoParametro, codigo, descripcion, texto1, texto2, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/parametro/' + parameterId,
        data: {
            'codigo': codigo,
            'tipoParametro': tipoParametro,
            'descripcion': descripcion,
            'texto1': texto1,
            'texto2': texto2,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addParameter = async (codigo, tipoParametro, descripcion, texto1, texto2, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/parametro',
        data: {
            'codigo': codigo,
            'tipoParametro': tipoParametro,
            'descripcion': descripcion,
            'texto1': texto1,
            'texto2': texto2,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeParameter = async (parameterId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/parametro/' + parameterId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}