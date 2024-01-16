import React from 'react';
import { parseDate } from '../../utils/Utils';

const CellDate = ({ value, hidden }) => {
    return (
        <td hidden={hidden}>{value && value != 'null' && parseDate(value)}</td>
    );
}

export default CellDate;