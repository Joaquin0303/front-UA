import React, { useState } from 'react';
import Row from './Row'
import '../../styles/abm.css'
import i18n from '../../localization/i18n'

const Table = ({ pageName, dataList, setModal, statusActive }) => {

    return (
        <>
            {dataList && dataList.length > 0 &&
                <div className='table-wrapper' >
                    <table className='table' style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                {
                                    Object.keys(dataList[0]).map((k, i) => {
                                        if (k == 'empleado') {
                                            return <>
                                                <th key={i + "a"}>{i18n.t('numeroLegajo')}</th>
                                                <th key={i + "b"}>{i18n.t('nombre')}</th>
                                            </>
                                        } else if (k != 'id' && k != 'activo' && k != 'usuarios'
                                            && (pageName != 'Permisos' || k != 'roles')
                                            && (pageName != 'Roles' || k != 'codigo')
                                            && (pageName != 'parameterType' || k != 'codigo')
                                            && (pageName != 'Puesto' || k != 'codigo')
                                            && (!statusActive || k != 'fechaBaja')
                                        )
                                            return <th key={i}>{i18n.t(k)}</th>
                                    })
                                }
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((d, i) => {
                                return <Row pageName={pageName} key={i} data={d} setModal={setModal} statusActive={statusActive} />
                            })}
                        </tbody>
                    </table>
                </div >
            }
        </>
    );
}

export default Table;