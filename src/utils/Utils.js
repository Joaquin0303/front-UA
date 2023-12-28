

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