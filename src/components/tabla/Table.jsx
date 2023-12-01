import React from 'react';
import Row from './Row'
import '../../styles/abm.css'

const Table = ({ dataList }) => {
    return (
        <>
            {dataList && dataList.length > 0 &&
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                {
                                    Object.keys(dataList[0]).map((k, i) => {
                                        if (!Array.isArray(dataList[0][k]))
                                            return <th key={i}>{k}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((d, i) => {
                                return <Row key={i} data={d} />
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default Table;