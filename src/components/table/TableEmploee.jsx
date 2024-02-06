import React from "react";
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbLicense, TbLicenseOff } from "react-icons/tb";
import { MODAL_FORM, TABLE_ACTIONS } from "../../utils/GeneralConstants";
import { LicenseModel } from "../../pages/EmployeesAdmin/LicenseHistoryPage";
import { LoadFamilyModel } from "../../pages/EmployeesAdmin/LoadFamilyPage";
import { MdFamilyRestroom } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { searchByEmployeeId } from "../../services/LicenseServices";
import { putDownLicenceModel } from "../../pages/EmployeesAdmin/LicenseHistoryPage";

const TableEmployee = ({ tableConfiguration, dataList, openModalForm }) => {

    const openLicenceModal = (emp) => {
        const licence = { ...LicenseModel };
        licence.empleado = emp;
        openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.ADDLICENCE, licence);
    }

    const openAddFamilyModal = (emp) => {
        const family = { ...LoadFamilyModel };
        family.numeroLegajo = emp.numeroLegajo;
        family.empleado = emp;
        openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.ADDFAMILY, family)
    }

    const openRenewLicenceModal = (emp) => {
        searchByEmployeeId(emp.id).then(licence => {
            const licenceToRenew = { ...licence.model };
            licenceToRenew.oldLicence = licence.model;
            openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.RENEWLICENCE, licenceToRenew);
        })
    }

    const openPutdownLicenceModal = (emp) => {
        const putDownLicence = { ...putDownLicenceModel };
        searchByEmployeeId(emp.id).then(licence => {
            putDownLicence.licence = licence.model;
            openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.PUTDOWNLICENCE, putDownLicence);
        })
    }

    return (
        <div className='table-wrapper' >
            <table className='table' style={{ width: '80%' }}>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>País</th>
                        <th>Puesto</th>
                        <th>Dirección</th>
                        <th>Gerencia</th>
                        <th>Estado</th>
                        <th style={{ width: '20%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((d, i) => {
                        return <tr key={i} className={d.codigoEstadoEmpleado.id == 88 ? 'table-row-status-inactive' : ''} title={d.codigoEstadoEmpleado.id == 88 ? 'Inactivo' : 'Activo'}>
                            <td className='first-column'>{d.numeroLegajo}</td>
                            <td>{d.apellido}</td>
                            <td>{d.nombre}</td>
                            <td>{d.codigoPais.descripcion}</td>
                            <td>{d.codigoPuesto.descripcion}</td>
                            <td>{d.codigoDireccion.descripcion}</td>
                            <td>{d.codigoPuesto.codigoGerencia ? d.codigoPuesto.codigoGerencia.descripcion : ''}</td>
                            <td>{d.codigoEstadoEmpleado.descripcion}</td>
                            <td className='expand'>
                                <span className='actions'>
                                    {<div title="Ver" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.EMPLOYEEMODAL, TABLE_ACTIONS.VIEW, d) }}>
                                        <IoEyeSharp />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 87 && <div title="Editar" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.EMPLOYEEMODAL, TABLE_ACTIONS.EDIT, d) }}>
                                        <BsFillPencilFill />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 87 && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.EMPLOYEEMODAL, TABLE_ACTIONS.PUTDOWN, d) }}>
                                        <FaArrowDown />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 87 && <div title="Dar Licencia" onClick={(e) => { e.stopPropagation(); openLicenceModal(d) }}>
                                        <TbLicense />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 87 && <div title="Cargar Familia" onClick={(e) => { e.stopPropagation(); openAddFamilyModal(d) }}>
                                        <MdFamilyRestroom />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 87 && <div title="Cambio De Puesto" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.EMPLOYEEMODAL, TABLE_ACTIONS.CHANGEPOSITION, d) }}>
                                        <TbStatusChange />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 88 && <div title="Renovar Licencia" onClick={(e) => { e.stopPropagation(); openRenewLicenceModal(d) }}>
                                        <TbLicense />
                                    </div>}
                                    {d.codigoEstadoEmpleado.id == 88 && <div title="Finalizar Licencia" onClick={(e) => { e.stopPropagation(); openPutdownLicenceModal(d) }}>
                                        <TbLicenseOff />
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