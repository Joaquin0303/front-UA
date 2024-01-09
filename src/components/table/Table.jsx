import React, { useState } from 'react';
import Row from './Row'
import '../../styles/abm.css'
import i18n from '../../localization/i18n'

const Table = ({ tableConfiguration, dataList, openModalForm }) => {

    const showColum = (columnName, data) => {
        return (tableConfiguration.activeRows.includes(columnName) && data.activo) || (tableConfiguration.inactiveRows.includes(columnName) && !data.activo);
    }
    return (
        <>
            {dataList && dataList.length > 0 &&
                <div className='table-wrapper' >
                    <table className='table' style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                {
                                    Object.keys(dataList[0]).map((key, i) => {
                                        if (showColum(key, dataList[0])) {
                                            if (key == 'empleado') {
                                                return <>
                                                    <th key={i + "a"}>{i18n.t('numeroLegajo')}</th>
                                                    <th key={i + "b"}>{i18n.t('nombre')}</th>
                                                </>
                                            } else {
                                                return <th key={i}>{i18n.t(key)}</th>
                                            }
                                        }
                                    })
                                }
                                {openModalForm && <th style={{ width: '20%' }}>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((d, i) => {
                                return <Row tableConfiguration={tableConfiguration} key={i} data={d} openModalForm={openModalForm} />
                            })}
                        </tbody>
                    </table>
                </div >
            }
        </>
    );
}

export default Table;