import axios from 'axios'
import { host } from '../Configs';

export const getSequencers = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/secuenciador'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getSequencerById = async (sequencerId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/secuenciador/' + sequencerId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addSequencer = async (codigo, rangoDesde, rangoHasta, secuencia, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/secuenciador',
        data: {
            'codigo': codigo,
            'rangoDesde': rangoDesde,
            'rangoHasta': rangoHasta,
            'secuencia': secuencia,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateSequencer = async (sequencerId, codigo, rangoDesde, rangoHasta, secuencia, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/secuenciador/' + sequencerId,
        data: {
            'codigo': codigo,
            'rangoDesde': rangoDesde,
            'rangoHasta': rangoHasta,
            'secuencia': secuencia,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeSequencer = async (sequencerId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/secuenciador/' + sequencerId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getCurrentSequence = async (sequencerCode) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/secuenciador/secuencia/' + sequencerCode
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

