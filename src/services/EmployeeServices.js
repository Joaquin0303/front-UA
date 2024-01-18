import axios from 'axios'
import { host } from '../Configs';

export const getEmployees = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleado'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getEmployeeById = async (employeeId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleado/' + employeeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateEmployee = async (employeeId, employee) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/empleado/' + employeeId,
        data: employee
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addEmployee = async (employee) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/empleado',
        data: employee
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeEmployee = async (employeeId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/empleado/' + employeeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const searchEmployee = async (numeroLegajo) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/empleado/buscar?',
        params: {
            numeroLegajo: numeroLegajo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}