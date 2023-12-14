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

export const updatePosition = async (positionId, codigoPais, descripcion, codigoDireccion, codigoCentroDeCosto, codigoGerencia, codigoJefatura, codigoCategoria, codigoPuestoAlQueReporta, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/puesto/' + positionId,
        data: {
            'descripcion': descripcion,
            'codigoPais': codigoPais && codigoPais.id > 0 ? codigoPais : null,
            'codigoDireccion': codigoDireccion && codigoDireccion.id > 0 ? codigoDireccion : null,
            'codigoCentroDeCosto': codigoCentroDeCosto && codigoCentroDeCosto.id > 0 ? codigoCentroDeCosto : null,
            'codigoGerencia': codigoGerencia && codigoGerencia.id > 0 ? codigoGerencia : null,
            'codigoJefatura': codigoJefatura && codigoJefatura.id > 0 ? codigoJefatura : null,
            'codigoCategoria': codigoCategoria && codigoCategoria.id > 0 ? codigoCategoria : null,
            'codigoPuestoAlQueReporta': codigoPuestoAlQueReporta && codigoPuestoAlQueReporta.id > 0 ? codigoPuestoAlQueReporta : null,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPosition = async (codigoPais, descripcion, codigoDireccion, codigoCentroDeCosto, codigoGerencia, codigoJefatura, codigoCategoria, codigoPuestoAlQueReporta, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/puesto',
        data: {
            'descripcion': descripcion,
            'codigoPais': codigoPais && codigoPais.id > 0 ? codigoPais : null,
            'codigoDireccion': codigoDireccion && codigoDireccion.id > 0 ? codigoDireccion : null,
            'codigoCentroDeCosto': codigoCentroDeCosto && codigoCentroDeCosto.id > 0 ? codigoCentroDeCosto : null,
            'codigoGerencia': codigoGerencia && codigoGerencia.id > 0 ? codigoGerencia : null,
            'codigoJefatura': codigoJefatura && codigoJefatura.id > 0 ? codigoJefatura : null,
            'codigoCategoria': codigoCategoria && codigoCategoria.id > 0 ? codigoCategoria : null,
            'codigoPuestoAlQueReporta': codigoPuestoAlQueReporta && codigoPuestoAlQueReporta.id > 0 ? codigoPuestoAlQueReporta : null,
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