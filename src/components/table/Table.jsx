import React, { useState, useEffect } from 'react';
import '../../styles/abm.css'
import i18n from '../../localization/i18n'
import RowV2 from './RowV2';

const Table = ({ tableConfiguration, dataList, openModalForm }) => {

    const [columnsKey, setColumsKeys] = useState([]);

    useEffect(() => {
        if (dataList && dataList.length > 0) {
            const keys = Object.keys(dataList[0]);
            const additinalKeys = tableConfiguration.aditionalRows ? tableConfiguration.aditionalRows : [];
            if (tableConfiguration.sortRow)
                setColumsKeys(keys.concat(additinalKeys).sort(compareCol));
            else
                setColumsKeys(keys.concat(additinalKeys));
        }
    }, [dataList]);

    const showColum = (columnName, data) => {
        return (tableConfiguration.activeRows.includes(columnName) && data.activo) || (tableConfiguration.inactiveRows.includes(columnName) && !data.activo);
    }

    const compareCol = (a, b) => {
        if (tableConfiguration.sortRow.indexOf(a) < tableConfiguration.sortRow.indexOf(b))
            return -1
        else if (tableConfiguration.sortRow.indexOf(a) > tableConfiguration.sortRow.indexOf(b))
            return 1
        else
            return 0
    }

    const buildHeader = () => {

        const cellHeader = columnsKey.map((key, i) => {
            if (showColum(key, dataList[0])) {
                if (key == 'empleado') {
                    return <>
                        <th key={i + "a"}>{i18n.t('numeroLegajo')}</th>
                        <th key={i + "b"}>{i18n.t('nombre')}</th>
                    </>
                } else {
                    const hidden = tableConfiguration.hiddenRows && tableConfiguration.hiddenRows.find(r => r == key) != null;
                    const label = tableConfiguration.getHeaderLabel ? tableConfiguration.getHeaderLabel(key) : key;
                    return <th hidden={hidden} key={i}>{i18n.t(label)}</th>
                }
            }
        });
        return cellHeader;
    }

    return (
        <>
            {dataList && dataList.length > 0 &&
                <div className='table-wrapper' >
                    <table className='table' style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                {
                                    buildHeader()
                                }
                                {openModalForm && <th style={{ width: '20%' }}>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((d, i) => {
                                return <RowV2 columnsKey={columnsKey} tableConfiguration={tableConfiguration} key={i} data={d} openModalForm={openModalForm} />
                            })}
                        </tbody>
                    </table>
                </div >
            }
        </>
    );
}

export default Table;