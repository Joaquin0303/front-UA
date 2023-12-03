import React, { useState } from 'react';
import Row from './Row'
import '../../styles/abm.css'
import i18n from '../../localization/i18n'

const Table = ({ dataList, setModal }) => {

    return (
        <>
            {dataList && dataList.length > 0 &&
                <div className='table-wrapper' >
                    <table className='table' style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                {
                                    Object.keys(dataList[0]).map((k, i) => {
                                        if (!Array.isArray(dataList[0][k]) && k != 'id')
                                            return <th key={i}>{i18n.t(k)}</th>
                                    })
                                }
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((d, i) => {
                                return <Row key={i} data={d} setModal={setModal} />
                            })}
                        </tbody>
                    </table>
                </div >
            }
        </>
    );
}

export default Table;