import React from 'react';

const CellDate = ({ value }) => {

    const parseDate = (d) => {
        const date = new Date(d);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        const formattedDate = formatter.format(date);
        return formattedDate;
        /* const date = new Date(d);
        return date.toLocaleDateString(); */
    }
    return (
        <td>{value && parseDate(value)}</td>
    );
}

export default CellDate;