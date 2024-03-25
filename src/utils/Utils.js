
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
            const da = d.substring(0, 10).split('-');
            return [da[2], da[1], da[0]].join('/');
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

export const parseTodayStr2 = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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

export const stringToInteger = (strNumber, defNumber) => {
    const n = parseInt(strNumber, 10);
    if (!isNaN(n)) {
        return n;
    } else {
        console.warn('stringToInteger return default number.');
        return defNumber;
    }
}