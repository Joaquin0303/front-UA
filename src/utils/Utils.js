
import { jwtDecode } from "jwt-decode";
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'
import HmacSHA256 from 'crypto-js/hmac-sha256';

export const compareStrDates = (strDate1, strDate2) => {
    const d1 = parseInputDate(strDate1);
    const d2 = parseInputDate(strDate2);
    if (d1.getTime() < d2.getTime()) {
        return 1;
    }
    else if (d1.getTime() > d2.getTime()) {
        return -1
    }
    else {
        return 0;
    }

}

export const trimDate = (d) => {
    if (d)
        return new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' GMT-0300');
    else
        return null;
}

export const parseDate = (d) => {
    if (d) {
        try {
            const date = new Date(d.substring(0, 10) + " GMT-0300");
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formatter = new Intl.DateTimeFormat('es-ES', options);
            const formattedDate = formatter.format(date);
            return formattedDate;
        } catch (error) {
            console.error(error);
        }
    }
}

export const parseInputDate = (d) => {
    if (d && d.length >= 10)
        return new Date(d.substring(0, 10) + ' GMT-0300');
    else
        return null;
}

export const parseToday = () => {
    const d = new Date();
    return new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' GMT-0300');
}

export const parseTodayStr = () => {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' GMT-0300';
}

export const diffBetweenDates = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return diffTime;
}

export const decodeToken = (token) => {
    return jwtDecode(token);
}

export const codeToken = (header, payload) => {
    return base64url(header) + '.' + base64url(payload)
}

export const base64url = (source) => {
    var wordArray = Utf8.parse(source);
    // Encode in classical base64
    let encodedSource = Base64.stringify(wordArray);
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}