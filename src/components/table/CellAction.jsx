import React from 'react';
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { PiPencilSimpleSlashBold } from "react-icons/pi";

const CellAction = ({ data, setModal, statusActive }) => {
    return (
        <td className='expand'>
            <span className='actions'>
                <div title="Ver" onClick={(e) => { e.stopPropagation(); setModal('view', data) }}>
                    <IoEyeSharp />
                </div>
                {statusActive && <div title="Editar" onClick={(e) => { e.stopPropagation(); setModal('edit', data) }}>
                    <BsFillPencilFill />
                </div>}
                {data.activo && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); setModal('inactivate', data) }}>
                    <FaArrowDown />
                </div>}
                {!data.activo && <div title="Dar de Alta" onClick={(e) => { e.stopPropagation(); setModal('activate', data) }}>
                    <FaArrowUp />
                </div>}
            </span>
        </td>
    );
};

export default CellAction;