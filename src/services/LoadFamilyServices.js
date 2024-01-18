import axios from 'axios'
import { host } from '../Configs';
import { searchEmployee } from './EmployeeServices';

export const getLoadFamilies = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/cargadefamilia'
    }).then(response => {
        if (response) {
            let r = Promise.all(response.data.list.map(hp => {
                hp.empleado = searchEmployee(hp.numeroLegajo).then(r => {
                    return r.list.findLast(e => e.numeroLegajo == hp.numeroLegajo);
                });
                return hp;
            })).then(elr => {
                return elr;
            });
            return r;
        } else {
            return response;
        }
    }).catch(error => {
        throw error;
    })
    return result;
}

export const getLoadFamilyById = async (loadFamilyId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/cargadefamilia/' + loadFamilyId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updateLoadFamily = async (loadFamilyId, loadFamilyData) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/cargadefamilia/' + loadFamilyId,
        data: loadFamilyData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addLoadFamily = async (loadFamilyData) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/cargadefamilia',
        data: loadFamilyData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeLoadFamily = async (loadFamilyId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/cargadefamilia/' + loadFamilyId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}