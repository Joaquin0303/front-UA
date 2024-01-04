import React from 'react';
import Cell from './Cell';
import CellAction from './CellAction';
import CellSequencer from './CellSequencer';
import CellParameterType from './CellParameterType';
import CellRole from './CellRole';
import CellPermission from './CellPermission';
import CellParameter from './CellParameter';
import CellDate from './CellDate';
import CellPositionCode from './CellPositionCode';
import CellCountry from './CellCountry';
import CellEmployee from './CellEmployee';
import CellAge from './CellAge';

const Row = ({ tableConfiguration, data, openModalForm }) => {

    const showColum = (columnName) => {
        return (tableConfiguration.activeRows.includes(columnName) && data.activo) || (tableConfiguration.inactiveRows.includes(columnName) && !data.activo);
    }

    const createCells = () => {
        const cells = Object.keys(data).map((key, i) => {

            if (showColum(key)) {
                switch (key) {
                    case 'secuenciador':
                        return <CellSequencer key={i} sequencerData={data[key]} />
                    case 'tipoParametro':
                        return <CellParameterType key={i} tipoParametroData={data[key]} />
                    case 'roles':
                        return <CellRole key={i} roleData={data[key]} />
                    case 'permisos':
                        return <CellPermission key={i} permissionData={data[key]} />
                    case 'edades':
                        return <CellAge key={i} ageData={data[key]} />
                    case 'codigoDireccion':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoGerencia':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoJefatura':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoCategoria':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoCentroDeCosto':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoPais':
                        return <CellCountry key={i} country={data[key]} />
                    case 'codigoPuestoAlQueReporta':
                        return <CellPositionCode key={i} position={data[key]} />
                    case 'empleado':
                        return <CellEmployee key={i} employee={data[key]} />
                    case 'tipoLicencia':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoPuesto':
                        return <CellPositionCode key={i} position={data[key]} />
                    case 'codigoOficina':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoTipoDocumento':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoProveedor':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoDivision':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoGenero':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoEstadoEmpleado':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoPuestoJefe':
                        return <CellPositionCode key={i} position={data[key]} />
                    case 'codigoCategoriaEmpleado':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'codigoConvenio':
                        return <CellParameter key={i} parameter={data[key]} />
                    case 'fte':
                        return <CellParameter key={i} parameter={data[key]} />
                    default:
                        if (key.startsWith('fecha'))
                            return <CellDate key={i} value={data[key]} />
                        else
                            return <Cell key={i} value={data[key]} />
                }
            }
        });
        return cells;
    }

    return (
        <>
            <tr>
                {createCells()}
                {openModalForm && <CellAction actions={tableConfiguration.actions} data={data} openModalForm={openModalForm} />}
            </tr>
        </>
    );
}

export default Row;