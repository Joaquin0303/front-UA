import React from 'react';
import Cell from './Cell';
import CellAction from './CellAction';
import CellSequencer from './CellSequencer';
import CellParameterType from './CellParameterType';
import CellRole from './CellRole';
import CellPermission from './CellPermission';
import CellParameter from './CellParameter';
import CellDate from './CellDate';

const Row = ({ pageName, data, setModal }) => {

    const createCells = () => {
        const cells = Object.keys(data).map((key, i) => {
            switch (key) {
                case 'secuenciador':
                    return <CellSequencer key={i} sequencerData={data[key]} />
                case 'tipoParametro':
                    return <CellParameterType key={i} tipoParametroData={data[key]} />
                case 'roles':
                    if (pageName != 'Permisos')
                        return <CellRole key={i} roleData={data[key]} />
                    break;
                case 'permisos':
                    return <CellPermission key={i} permissionData={data[key]} />
                case 'codigoDireccion':
                    return <CellParameter key={i} parameterId={data[key]} />
                case 'codigoGerencia':
                    return <CellParameter key={i} parameterId={data[key]} />
                case 'codigoJefatura':
                    return <CellParameter key={i} parameterId={data[key]} />
                case 'codigoCategoria':
                    return <CellParameter key={i} parameterId={data[key]} />
                default:
                    if (key.startsWith('fecha'))
                        return <CellDate key={i} value={data[key]} />
                    else
                        if (!Array.isArray(data[key]) && key != 'id' && key != 'activo' && key != 'usuarios')
                            return <Cell key={i} value={data[key]} />
            }
        });
        return cells;
    }

    return (
        <>
            <tr>
                {createCells()}
                <CellAction data={data} setModal={setModal} />
            </tr>
        </>
    );
}

export default Row;