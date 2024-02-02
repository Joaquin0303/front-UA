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
import CellDynamicEmployee from './CellDynamicEmployee';

const RowV2 = ({ columnsKey, tableConfiguration, data, openModalForm }) => {

    const showColum = (columnName) => {
        return (tableConfiguration.activeRows.includes(columnName) && data.activo) || (tableConfiguration.inactiveRows.includes(columnName) && !data.activo);
    }

    const createCells = () => {

        const cells = columnsKey.map((key, i) => {
            if (showColum(key)) {
                return createCell(key, i, tableConfiguration.hiddenRows && tableConfiguration.hiddenRows.find(r => r == key) != null);
            } else {
                return null;
            }
        });
        return cells;
    }

    const createCell = (key, i, hidden) => {
        const fieldType = tableConfiguration.getFieldTypeByName(key);
        if (!fieldType) {
            return <Cell key={i} hidden={hidden} value={data[key]} />
        }
        switch (fieldType.type) {
            case 'parameter':
                return <CellParameter key={i} parameter={data[key]} />
            case 'parameter.search':
                return <CellParameter key={i} parameter={data[key]} />
            case 'calendar':
                return <CellDate key={i} hidden={hidden} value={data[key]} />
            case 'parameterType':
                return <CellParameterType key={i} tipoParametroData={data[key]} />
            case 'position':
                return <CellPositionCode key={i} position={data[key]} />
            case 'numberNonCero':
                return <Cell key={i} hidden={hidden} value={data[key] == 0 ? '' : data[key]} />
            case 'leaderPosition':
                return <CellPositionCode key={i} position={data[key]} />
            case 'role':
                return <CellRole key={i} roleData={data[key]} />
            case 'permission':
                return <CellPermission key={i} permissionData={data[key]} />
            case 'country':
                return <CellCountry key={i} country={data[key]} />
            case 'sequencer':
                return <CellSequencer key={i} sequencerData={data[key]} />
            case 'listString':
                return <CellAge key={i} ageData={data[key]} separator={fieldType.separator} />;
            case 'employee':
                return <CellDynamicEmployee key={i} employee={data[fieldType.employee]} fields={fieldType.employeeFields} />
            default:
                return <Cell hidden={hidden} key={i} value={data[key]} labels={fieldType.labels} />
        }
    }

    return (
        <>
            <tr className={!data.activo ? 'table-row-status-blocked' : ''}>
                {createCells()}
                {openModalForm && <CellAction actions={tableConfiguration.actions} data={data} openModalForm={openModalForm} />}
            </tr>
        </>
    );
}

export default RowV2;