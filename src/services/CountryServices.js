import axios from 'axios'
import { host } from '../Configs';
import { isAlive } from './IsAliveServices';
import useToken from '../useToken';


export const getCountries = async () => {
    const { token, setToken } = useToken();
    if (isAlive() === false){
        setToken(null);
    }
    else{
        const result = await axios({
            method: 'get',
            url: host + '/ua/pais'
        }).then(response => {
            return response;
        }).catch(error => {
            throw error;
        })
        return result.data;
    }
}

export const getCountryById = async (countryId) => {
    if (isAlive() === false){
        setToken(null);
    }
    else{
    const result = await axios({
        method: 'get',
        url: host + '/ua/pais/' + countryId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
    }
}

export const updateCountry = async (countryId, descripcion, codigo, secuenciador, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/pais/' + countryId,
        data: {
            'codigo': codigo,
            'descripcion': descripcion,
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

export const addCountry = async (codigo, descripcion, secuenciador, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/pais',
        data: {
            'codigo': codigo,
            'descripcion': descripcion,
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
        url: host + '/ua/pais/' + countryId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}