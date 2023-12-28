

export const compareStrDates = (strDate1, strDate2) => {
    const d1 = new Date(strDate1);
    const d2 = new Date(strDate2);

    console.log('COMPARE DATES: ', d1, d2);

    if (d1.getTime() < d2.getTime()) {
        console.log('COMPARE RESULT 1');
        return 1;
    }
    else if (d1.getTime() > d2.getTime()) {
        console.log('COMPARE RESULT -1');
        return -1
    }
    else {
        console.log('COMPARE RESULT 0');
        return 0;
    }


}