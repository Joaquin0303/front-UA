import React from 'react';
import { parseDate } from '../../utils/Utils';

const CellDate = ({ value }) => {

    return (
        <td>{value && parseDate(value)}</td>
    );
}

export default CellDate;