

export const compareStrDates = (strDate1, strDate2) => {
    const d1 = new Date(strDate1);
    const d2 = new Date(strDate2);

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


export const parseDate = (d) => {
    const date = new Date(d);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('es-ES', options);
    const formattedDate = formatter.format(date);
    return formattedDate;
}

export const parseInputDate = (d) => {
    return new Date(d + ' GMT-0300');
}

export const parseToday = () => {
    const d = new Date();
    return new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' GMT-0300');
}

