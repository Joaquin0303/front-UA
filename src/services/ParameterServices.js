import axios from 'axios'

const context = 'http://localhost:8080';
//const context = '';

export const getParameters = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/parametro'
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
        url: context + '/ua/parametro/' + parameterId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateParameter = async (parameterId, codigo, descripcion, texto1, texto2, activo) => {
    const result = await axios({
        method: 'put',
        url: context + '/ua/parameter/' + parameterId,
        data: {
            'codigo': codigo,
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

export const addParameter = async (codigo, descripcion, texto1, texto2, activo) => {
    const result = await axios({
        method: 'post',
        url: context + '/ua/parametro',
        data: {
            'codigo': codigo,
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
        url: context + '/ua/parameter/' + parameterId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}