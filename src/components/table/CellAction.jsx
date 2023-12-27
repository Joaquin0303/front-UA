import React from 'react';
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { PiPencilSimpleSlashBold } from "react-icons/pi";
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const CellAction = ({ actions, data, setModal }) => {

    const showAction = (actionName) => {
        return (actions.activeActions.includes(actionName) && data.activo) ||
            (actions.inactiveActions.includes(actionName) && !data.activo);
    }

    return (
        <td className='expand'>
            <span className='actions'>
                {showAction(TABLE_ACTIONS.VIEW) && <div title="Ver" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.VIEW, data) }}>
                    <IoEyeSharp />
                </div>}
                {showAction(TABLE_ACTIONS.EDIT) && <div title="Editar" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.EDIT, data) }}>
                    <BsFillPencilFill />
                </div>}
                {showAction(TABLE_ACTIONS.INACTIVATE) && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.INACTIVATE, data) }}>
                    <FaArrowDown />
                </div>}
                {showAction(TABLE_ACTIONS.ACTIVATE) && <div title="Dar de Alta" onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.ACTIVATE, data) }}>
                    <FaArrowUp />
                </div>}
            </span>
        </td>
    );
};

export default CellAction;