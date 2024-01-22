
import { jwtDecode } from "jwt-decode";

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
        const date = new Date(d.substring(0, 10) + " GMT-0300");
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        const formattedDate = formatter.format(date);
        return formattedDate;
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
