import React from 'react';
import '../../styles/abm.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown } from "react-icons/fa";

const CellAction = ({ data, edit, view, remove }) => {

    return (
        <td className='expand'>
            <span className='actions'>
                <div title="Ver" onClick={() => { setSelectedUser(data); setViewModalOpen(true) }}>
                    <IoEyeSharp />
                </div>
                <div title="Editar">
                    <BsFillPencilFill onClick={() => { setSelectedUser(data); setEditModalOpen(true) }} />
                </div>
                <div title="Dar de Baja" onClick={() => { setSelectedUser(data); setDeleteModalOpen(true) }}>
                    <FaArrowDown />
                </div>
            </span>
        </td>
    );
};


export default CellAction;

