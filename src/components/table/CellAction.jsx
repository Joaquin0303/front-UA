import React from 'react';
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { TbLicenseOff } from "react-icons/tb";
import { MODAL_FORM, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const CellAction = ({ actions, data, openModalForm }) => {

    const showAction = (actionName) => {
        return (actions.activeActions.includes(actionName) && data.activo) ||
            (actions.inactiveActions.includes(actionName) && !data.activo);
    }

    return (
        <td className='expand'>
            <span className='actions'>
                {showAction(TABLE_ACTIONS.VIEW) && <div title="Ver" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.VIEW, data) }}>
                    <IoEyeSharp />
                </div>}
                {showAction(TABLE_ACTIONS.EDIT) && <div title="Editar" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.EDIT, data) }}>
                    <BsFillPencilFill />
                </div>}
                {showAction(TABLE_ACTIONS.INACTIVATE) && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.INACTIVATE, data) }}>
                    <FaArrowDown />
                </div>}
                {showAction(TABLE_ACTIONS.ACTIVATE) && <div title="Dar de Alta" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.ACTIVATE, data) }}>
                    <FaArrowUp />
                </div>}
                {showAction(TABLE_ACTIONS.PUTDOWNLICENCE) && <div title="Finalizar Licencia" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.PUTDOWNLICENCE, data) }}>
                    <TbLicenseOff />
                </div>}
                {showAction(TABLE_ACTIONS.ADDLICENCE) && <div title="Renovar Licencia" onClick={(e) => { e.stopPropagation(); openModalForm(MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.ADDLICENCE, data) }}>
                    <TbLicense />
                </div>}
            </span>
        </td >
    );
};

export default CellAction;