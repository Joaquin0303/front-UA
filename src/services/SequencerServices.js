import axios from 'axios'

const context = 'http://localhost:8080';
//const context = '';

export const getSequencers = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/secuenciador'
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
        url: context + '/ua/secuenciador/' + sequencerId
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
        url: context + '/ua/secuenciador/' + sequencerId,
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
        url: context + '/ua/secuenciador/' + sequencerId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}