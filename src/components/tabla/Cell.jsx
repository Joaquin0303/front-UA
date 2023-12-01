import React from 'react';


const Cell = ({ value }) => {
    if (typeof value == 'boolean')
        value = value ? 'Si' : 'No';
    return (
        <td>{value}</td>
    );
}

export default Cell;