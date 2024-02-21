import axios from 'axios'
import { host } from '../Configs';

export const isAlive = async () => {
    const result = await axios({
        method: 'get',
        url: host + '/login/isalive'
    }).then(response => {
        return JSON.parse(response);
    }).catch(error => {
        throw error;
    })
    console.log(result.data);
    return result.data;
}