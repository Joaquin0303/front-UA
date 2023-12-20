import axios from 'axios'
import { host } from '../Configs';

export const getExcludedIncomes = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historialingresoscaidos'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getExcludedIncomeById = async (excludeIncomeId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historialingresoscaidos/' + excludeIncomeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateExcludedIncome = async (excludeIncomeId, employee, motivo, observaciones, activo) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/historialingresoscaidos/' + excludeIncomeId,
        data: {
            'employee': employee,
            'motivo': motivo,
            'activo': activo,
            'observaciones': observaciones
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addExcludedIncome = async (employee, motivo, observaciones, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/historialingresoscaidos',
        data: {
            'employee': employee,
            'motivo': motivo,
            'activo': activo,
            'observaciones': observaciones
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeExcludedIncome = async (excludeIncomeId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/historialingresoscaidos/' + excludeIncomeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}