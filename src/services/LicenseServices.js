import axios from 'axios'
import { host } from '../Configs';

export const getLicenses = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historiallicencias'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

/* export const getLicenseById = async (countryId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/pais/' + countryId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
} */

export const updateLicense = async (empleado, numeroLegajo, fechaInicio, fechaFin, motivoLicencia, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/historiallicencias/' + numeroLegajo,
        data: {
            'empleado': empleado,
            'fechaInicio': fechaInicio,
            'fechaFin': fechaFin,
            'motivoLicencia': motivoLicencia,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addLicense = async (empleado, numeroLegajo, fechaInicio, fechaFin, motivoLicencia, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/historiallicencias',
        data: {
            'empleado': empleado,
            'numeroLegajo': numeroLegajo,
            'fechaInicio': fechaInicio,
            'fechaFin': fechaFin,
            'motivoLicencia': motivoLicencia,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeLicense = async (numeroLegajo) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/historiallicencias/' + numeroLegajo
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}