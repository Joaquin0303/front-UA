import axios from 'axios'
import { host } from '../Configs';
import { getEmployees } from './EmployeeServices';

export const getPositionChanges = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historialpuestos'
    }).then(response => {
        if (response) {
            return getEmployees().then(employees => {
                response.data.list.map(p => {
                    const emp = employees.list.findLast(e => e.numeroLegajo == p.numeroLegajo && (e.codigoEstadoEmpleado.id == 87 || e.codigoEstadoEmpleado.id == 88));
                    p.empleado = emp;
                })
                return response;
            });
        } else {
            return response;
        }
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getPositionChangeById = async (positionChangeId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/historialpuestos/' + positionChangeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePositionChange = async (positionChangeId, positionChangeData) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/historialpuestos/' + positionChangeId,
        data: positionChangeData
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPositionChange = async (numeroLegajo, codigoPais, codigoOficina, codigoDireccion, codigoGerencia, codigoJefatura, codigoPuesto, fechaIngresoReconocida, fechaEgreso, activo) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/historialpuestos',
        data: {
            'numeroLegajo': numeroLegajo,
            'codigoPais': codigoPais,
            'codigoOficina': codigoOficina,
            'codigoDireccion': codigoDireccion,
            'codigoGerencia': codigoGerencia,
            'codigoJefatura': codigoJefatura,
            'codigoPuesto': codigoPuesto,
            'fechaIngresoReconocida': fechaIngresoReconocida,
            'fechaEgreso': fechaEgreso,
            'activo': activo
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removePositionChange = async (positionChangeId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/historialpuestos/' + positionChangeId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}