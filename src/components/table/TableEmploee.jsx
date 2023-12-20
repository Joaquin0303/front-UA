import React from "react";
import '../../styles/abm.css'
import i18n from '../../localization/i18n'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";


const TableEmployee = ({ dataList, setModal, statusActive }) => {
    return (
        <div className='table-wrapper' >
            <table className='table' style={{ width: '80%' }}>
                <thead>
                    <tr>
                        <th>Número de legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>País</th>
                        <th>Puesto</th>
                        <th>Dirección</th>
                        <th>Gerencia</th>
                        <th style={{ width: '20%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((d, i) => {
                        return <tr key={i}>
                            <td>{d.numeroLegajo}</td>
                            <td>{d.nombre}</td>
                            <td>{d.apellido}</td>
                            <td>{d.codigoPais.descripcion}</td>
                            <td>{d.codigoPuesto.descripcion}</td>
                            <td>{d.codigoDireccion.descripcion}</td>
                            <td></td>

                            <td className='expand'>
                                <span className='actions'>
                                    <div title="Ver" onClick={(e) => { e.stopPropagation(); setModal('view', d) }}>
                                        <IoEyeSharp />
                                    </div>
                                    {statusActive && <div title="Editar" onClick={(e) => { e.stopPropagation(); setModal('edit', d) }}>
                                        <BsFillPencilFill />
                                    </div>}
                                    {(d.codigoEstadoEmpleado.id == 87 || d.codigoEstadoEmpleado.id == 88) && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); setModal('cancel', d) }}>
                                        <FaArrowDown />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 88 && <div title="Dar de Alta" onClick={(e) => { e.stopPropagation(); setModal('activate', d) }}>
                                        <FaArrowUp />
                                    </div>}
                                    {(d.codigoEstadoEmpleado.id == 87 || d.codigoEstadoEmpleado.id == 88) && <div title="Dar Licencia" onClick={(e) => { e.stopPropagation(); setModal('inactivate', d) }}>
                                        <TbLicense />
                                    </div>}
                                </span>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default TableEmployee;