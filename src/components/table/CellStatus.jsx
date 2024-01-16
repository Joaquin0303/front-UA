import React from 'react';

const CellStatus = ({ value, labels }) => {
    return (
        <td>{labels ? labels.find(l => l.value == value).label : value}</td>
    );
}

export default CellStatus;