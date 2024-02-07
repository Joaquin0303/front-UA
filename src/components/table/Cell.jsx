import React from 'react';

const Cell = ({ value, labels, hidden }) => {
    if (typeof value == 'boolean')
        value = value ? 'Si' : 'No';
    return (
        <td hidden={hidden}>{labels ? labels.find(l => l.value == value)?.label : value != 'null' ? value : ''}</td>
    );
}

export default Cell;