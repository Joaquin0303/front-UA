import React from 'react';
import Cell from './Cell';
import CellAction from './CellAction';
import CellSequencer from './CellSequencer';
import CellParameterType from './CellParameterType';

const Row = ({ data, setModal }) => {

    const createCell = () => {
        const cells = Object.keys(data).map((key, i) => {
            switch (key) {
                case 'secuenciador':
                    return <CellSequencer sequencerData={data[key]} />
                case 'tipoParametro':
                    return <CellParameterType tipoParametroData={data[key]} />
                default:
                    if (!Array.isArray(data[key]) && key != 'id')
                        return <Cell key={i} value={data[key]} />
            }
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