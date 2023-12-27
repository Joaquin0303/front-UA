import React from "react";
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { TABLE_ACTIONS } from "../../utils/GeneralConstants";


const TableEmployee = ({ dataList, setModal }) => {
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
                                    {TABLE_ACTIONS.VIEW && <div title="Ver" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.VIEW, d) }}>
                                        <IoEyeSharp />
                                    </div>}
                                    {TABLE_ACTIONS.EDIT && d.codigoEstadoEmpleado.id == 87 && <div title="Editar" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.EDIT, d) }}>
                                        <BsFillPencilFill />
                                    </div>}
                                    {TABLE_ACTIONS.PUTDOWN && (d.codigoEstadoEmpleado.id == 87 || d.codigoEstadoEmpleado.id == 88) && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.PUTDOWN, d) }}>
                                        <FaArrowDown />
                                    </div>}
                                    {TABLE_ACTIONS.ACTIVATE && d.codigoEstadoEmpleado.id == 89 && <div title="Reincorporar" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.ACTIVATE, d) }}>
                                        <FaArrowUp />
                                    </div>}
                                    {TABLE_ACTIONS.INACTIVATE && (d.codigoEstadoEmpleado.id == 87 || d.codigoEstadoEmpleado.id == 88) && <div title="Dar Licencia" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.INACTIVATE, d) }}>
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