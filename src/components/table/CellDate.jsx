import React from 'react';

const CellDate = ({ value }) => {

    const parseDate = (d) => {
        const date = new Date(d);
        return date.toLocaleDateString();
    }
    return (
        <td>{value && parseDate(value)}</td>
    );
}

export default CellDate;