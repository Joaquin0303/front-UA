import axios from 'axios'
import { host } from '../Configs';

export const loginUser = async (credentials) => {

    if (credentials.userName == "admin" && credentials.password == "8U4RRHH&") {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WzEsMiwzXSwiZW1wbGVhZG8iOnsiY29kaWdvRGlyZWNjaW9uIjoxMjM0LCJjb2RpZ29Fc3RhZG9FbXBsZWFkbyI6ODcsImNvZGlnb0NhdGVnb3JpYUVtcGxlYWRvIjoxMjM0LCJjb2RpZ29QYWlzIjoxMjM0LCJub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXBlbGxpZG8iOiJTaXRpbyJ9fQ.lzoKvLBSVNrwOJTWTstpRFJnm_RjMdmIBxYI-NIYaWU"
        }
    } else if (credentials.userName == "usuarios" && credentials.password == "8U4RRHH&") {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InVzdWFyaW9zIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WzFdLCJlbXBsZWFkbyI6eyJjb2RpZ29EaXJlY2Npb24iOjEyMzQsImNvZGlnb0VzdGFkb0VtcGxlYWRvIjo4NywiY29kaWdvQ2F0ZWdvcmlhRW1wbGVhZG8iOjEyMzQsImNvZGlnb1BhaXMiOjEyMzQsIm5vbWJyZSI6IkFkbWluaXN0cmFkb3IiLCJhcGVsbGlkbyI6IlVzdWFyaW9zIn19.FlgIqoPaxyASthF9bwem3WqMQlVajQJmgeO--6yho6c"
        }
    } else if (credentials.userName == "rrhh" && credentials.password == "8U4RRHH&") {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJyaGgiLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbMiwzXSwiZW1wbGVhZG8iOnsiY29kaWdvRGlyZWNjaW9uIjoxMjM0LCJjb2RpZ29Fc3RhZG9FbXBsZWFkbyI6ODcsImNvZGlnb0NhdGVnb3JpYUVtcGxlYWRvIjoxMjM0LCJjb2RpZ29QYWlzIjoxLCJub21icmUiOiJSZWN1cnNvcyIsImFwZWxsaWRvIjoiSHVtYW5vcyJ9fQ.YIHKgFlOimdYvYic_Q_i8Q4-5JSysXanY-VmvlM6jYI"
        }
    } else if (credentials.userName == "ceo.arg" && credentials.password == "8U4RRHH&") {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpcmVjdG9yLmNlby5hcmciLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbNF0sImVtcGxlYWRvIjp7ImNvZGlnb0RpcmVjY2lvbiI6MTIzNCwiY29kaWdvRXN0YWRvRW1wbGVhZG8iOjg3LCJjb2RpZ29DYXRlZ29yaWFFbXBsZWFkbyI6MTIzNCwiY29kaWdvUGFpcyI6MSwicHVlc3RvIjp7ImlkIjoxMjM0LCJkZXNjcmlwY2lvbiI6IlVuaXZlcnNhbCBBc3Npc3RhbmNlIENFTyJ9LCJub21icmUiOiJSZXBvcnRlIiwiYXBlbGxpZG8iOiJEaXJlY3RvciBBcmcifX0.NJOvOveeF1_XiKVcaY14KU8UGiUu2YVLigWY2UjNZkQ"
        }
    } else if (credentials.userName == "ceo.latam" && credentials.password == "8U4RRHH&") {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpcmVjdG9yLmNlby5sYXRhbSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZXMiOls0XSwiZW1wbGVhZG8iOnsiY29kaWdvRGlyZWNjaW9uIjoxMjM0LCJjb2RpZ29Fc3RhZG9FbXBsZWFkbyI6ODcsImNvZGlnb0NhdGVnb3JpYUVtcGxlYWRvIjoxMjM0LCJjb2RpZ29QYWlzIjoxLCJwdWVzdG8iOnsiaWQiOjEyMzQsImRlc2NyaXBjaW9uIjoiQ292ZXIgTW9yZSBMQVRBTSBDRU8ifSwibm9tYnJlIjoiUmVwb3J0ZSIsImFwZWxsaWRvIjoiRGlyZWN0b3IgTGF0YW0ifX0.jdPOtcHoU_noH5YWGhKXIf7mm70ObsUfnWz520NxyPY"
        }
    }

    else {
        throw "Usuario o password inválido";
    }
    /*
        const result = await axios({
            method: 'post',
            url: host + '/ua/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(credentials)
        }).then(response => {
            if (response.data.codigo == 200) {
                return response.data.model;
            } else {
                throw response.data.mensajes[0];
            }
    
        }).catch(error => {
            console.error(error);
            throw error;
        })
        return result;
        */
}

export const getUsers = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const removeUser = async (userId) => {
    const result = await axios({
        method: 'delete',
        url: host + '/ua/usuario/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const getUserById = async (userId) => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/' + userId
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const editUser = async (userId, numeroLegajo, nombreUsuario, activo, roles) => {
    const fechaBaja = activo ? null : new Date();
    const result = await axios({
        method: 'put',
        url: host + '/ua/usuario/' + userId,
        data: {
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario,
            'activo': activo,
            'roles': roles,
            'fechaBaja': fechaBaja
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const addUser = async (numeroLegajo, nombreUsuario, activo, roles) => {
    const result = await axios({
        method: 'post',
        url: host + '/ua/usuario',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'numeroLegajo': numeroLegajo,
            'nombreUsuario': nombreUsuario,
            'activo': activo,
            'roles': roles
        })
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const SearchUser = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/ua/usuario/buscar?'
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}
