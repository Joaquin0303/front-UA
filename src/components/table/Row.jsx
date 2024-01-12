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
import CellEmployeeName from './CellEmployeeName';
import CellDynamicEmployee from './CellDynamicEmployee';

const Row = ({ columnsKey, tableConfiguration, data, openModalForm }) => {

    const showColum = (columnName) => {
        return (tableConfiguration.activeRows.includes(columnName) && data.activo) || (tableConfiguration.inactiveRows.includes(columnName) && !data.activo);
    }

    const createCells = () => {

        const cells = columnsKey.map((key, i) => {
            if (showColum(key)) {
                return createCell(key, i);
            } else {
                return null;
            }
        });
        return cells;
    }

    const createCell = (key, i) => {
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
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoCategoria':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoCentroDeCosto':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoPais':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellCountry key={i} country={data[key]} />
            case 'codigoPuestoAlQueReporta':
                return <CellPositionCode key={i} position={data[key]} />
            case 'empleado':
                return <CellEmployee key={i} employee={data[key]} />
            case 'tipoLicencia':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoPuesto':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellPositionCode key={i} position={data[key]} />
            case 'codigoOficina':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoTipoDocumento':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoProveedor':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoDivision':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoGenero':
                if (typeof data[key] == "string")
                    return <Cell key={i} value={data[key]} />
                else
                    return <CellParameter key={i} parameter={data[key]} />
            case 'codigoEstadoEmpleado':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoPuestoJefe':
                return <CellPositionCode key={i} position={data[key]} />
            case 'codigoCategoriaEmpleado':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoConvenio':
                return <CellParameter key={i} parameter={data[key]} />
            case 'codigoParentesco':
                return <CellParameter key={i} parameter={data[key]} />
            case 'cantidadHijos':
                return <Cell key={i} value={data[key] == 0 ? '' : data[key] == 0} />
            case 'nombreEmpleado':
                return <CellEmployeeName numeroLegajo={data['numeroLegajo']} />
            case 'empleado_documentoPersonal':
                return <CellDynamicEmployee employee={data['empleado']} fields={['numeroDocumentoPersonal']} />
            case 'empleado_nombreyapellido':
                return <CellDynamicEmployee employee={data['empleado']} fields={['apellido', 'nombre']} />
            case 'empleado_puesto':
                return <CellDynamicEmployee employee={data['empleado']} fields={['codigoPuesto']} />
            case 'empleado_direccion':
                return <CellDynamicEmployee employee={data['empleado']} fields={['codigoDireccion']} />
            case 'empleado_fechaEgreso':
                return <CellDynamicEmployee employee={data['empleado']} fields={['fechaEgreso']} />
            default:
                if (key.startsWith('fecha'))
                    return <CellDate key={i} value={data[key]} />
                else
                    return <Cell key={i} value={data[key]} />
        }
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