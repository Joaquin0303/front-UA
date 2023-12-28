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

export const getLicenseById = async (licenceId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historiallicencias/' + licenceId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateLicense = async (licenceId, empleado, numeroLegajo, fechaInicio, fechaFin, tipoLicencia, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/historiallicencias/' + licenceId,
        data: {
            'empleado': empleado,
            'numeroLegajo': numeroLegajo,
            'fechaInicio': fechaInicio,
            'fechaFin': fechaFin,
            'tipoLicencia': tipoLicencia,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addLicense = async (empleado, numeroLegajo, fechaInicio, fechaFin, tipoLicencia, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/historiallicencias',
        data: {
            'empleado': empleado,
            'numeroLegajo': numeroLegajo,
            'fechaInicio': fechaInicio,
            'fechaFin': fechaFin,
            'tipoLicencia': tipoLicencia,
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