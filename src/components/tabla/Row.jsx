import React from 'react';
import Cell from './Cell';
import CellAction from './CellAction';

const Row = ({ data }) => {

    const createCell = () => {
        const cells = Object.keys(data).map((key, i) => {
            if (!Array.isArray(data[key]))
                return <Cell key={i} value={data[key]} />
        });
        return cells;
    }

    return (
        <>
            <tr>
                {createCell()}
                <CellAction data={data} />
            </tr>
        </>
    );
}

export default Row;