import axios from 'axios'
import { host } from '../Configs';


export const login = async (userName, password) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/login',
        data: {
            'nombreUsuario': userName,
            'contrasena': password
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const unblockLogin = async (id) => {
    const result = await axios({
        method: 'get',
        url: host + '/login/desbloquear/' + id
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getPaswordSecurity = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/seguridadcontrasena'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getCurrentPaswordSecurity = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/seguridadcontrasena/vigente'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPaswordSecurity = async (data) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/seguridadcontrasena',
        data: data
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePaswordSecurity = async (id, data) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/seguridadcontrasena/' + id,
        data: data
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getPaswordSecurityParam = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/parametrosseguridadcontrasena'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addPaswordSecurityParam = async (diasValidezContrasena, cantidadReintentos) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/parametrosseguridadcontrasena',
        data: {
            'diasValidezContrasena': diasValidezContrasena,
            'cantidadReintentos': cantidadReintentos
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const updatePaswordSecurityParam = async (id, diasValidezContrasena, cantidadReintentos) => {
    const result = await axios({
        method: 'put',
        url: host + '/ua/parametrosseguridadcontrasena/' + id,
        data: {
            'diasValidezContrasena': diasValidezContrasena,
            'cantidadReintentos': cantidadReintentos
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}