import axios from 'axios'
import { host } from '../Configs';

export const getPositions = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/puesto'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getPositionById = async (positionId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/puesto/' + positionId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePosition = async (positionId, codigo, descripcion, codigoDireccion, codigoGerencia, codigoJefatura, codigoCategoria, codigoPuestoAlQueReporta, activo) => {
    console.log('codigoDireccion', codigoDireccion)
    const result = await axios({
        method: 'put',
        url: host + '/ua/puesto/' + positionId,
        data: {
            'codigo': codigo,
            'descripcion': descripcion,
            'codigoDireccion': codigoDireccion,
            'codigoGerencia': codigoGerencia,
            'codigoJefatura': codigoJefatura,
            'codigoCategoria': codigoCategoria,
            'codigoPuestoAlQueReporta': codigoPuestoAlQueReporta,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPosition = async (codigo, descripcion, codigoDireccion, codigoGerencia, codigoJefatura, codigoCategoria, codigoPuestoAlQueReporta, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/puesto',
        data: {
            'codigo': codigo,
            'descripcion': descripcion,
            'codigoDireccion': codigoDireccion,
            'codigoGerencia': codigoGerencia,
            'codigoJefatura': codigoJefatura,
            'codigoCategoria': codigoCategoria,
            'codigoPuestoAlQueReporta': codigoPuestoAlQueReporta,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removePosition = async (positionId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/puesto/' + positionId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}