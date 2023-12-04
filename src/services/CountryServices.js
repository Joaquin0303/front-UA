import axios from 'axios'

const context = 'http://localhost:8080';
//const context = '';

export const getCountries = async () => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/pais'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getCountryById = async (countryId) => {
    const result = await axios({
        method: 'get',
        url: context + '/ua/pais/' + countryId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateCountry = async (countryId, codigo, secuenciador, activo) => {
    const result = await axios({
        method: 'put',
        url: context + '/ua/pais/' + countryId,
        data: {
            'codigo': codigo,
            'activo': activo,
            'secuenciador': secuenciador
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addCountry = async (codigo, secuenciador, activo) => {
    const result = await axios({
        method: 'post',
        url: context + '/ua/pais',
        data: {
            'codigo': codigo,
            'activo': activo,
            'secuenciador': secuenciador
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeCountry = async (countryId) => {
    const result = await axios({
        method: 'delete',
        url: context + '/ua/pais/' + countryId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}