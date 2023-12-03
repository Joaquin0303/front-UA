import React from 'react';
import Cell from './Cell';
import CellAction from './CellAction';

const Row = ({ data, setModal }) => {

    const createCell = () => {
        const cells = Object.keys(data).map((key, i) => {
            if (!Array.isArray(data[key]) && key != 'id')
                return <Cell key={i} value={data[key]} />
        });
        return cells;
    }

    return (
        <>
            <tr>
                {createCell()}
                <CellAction data={data} setModal={setModal} />
            </tr>
        </>
    );
}

export default Row;