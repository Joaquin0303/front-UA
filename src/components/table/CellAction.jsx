import React from 'react';
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const CellAction = ({ data, setModal }) => {
    
    return (
        <td className='expand'>
            <span className='actions'>
                <div title="Ver" onClick={(e) => { e.stopPropagation(); setModal(true, 'see', data) }}>
                    <IoEyeSharp />
                </div>
                {data.activo && <div title="Editar" onClick={(e) => { e.stopPropagation(); setModal(true, 'edit', data) }}>
                    <BsFillPencilFill />
                </div>}
                {!data.activo && <div title="No se puede editar" onClick={(e) => { e.stopPropagation(); setModal(true, 'inactivate', data) }}>
                    <PiPencilSimpleSlashBold />
                </div>}
                {data.activo && <div title="Dar de Baja" onClick={(e) => { e.stopPropagation(); setModal(true, 'inactivate', data) }}>
                    <FaArrowDown />
                </div>}
                {!data.activo && <div title="Dar de Alta" onClick={(e) => { e.stopPropagation(); setModal(true, 'activate', data) }}>
                    <FaArrowUp />
                </div>}
            </span>
        </td>
    );
};

export default CellAction;