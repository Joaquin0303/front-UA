import React, { } from 'react'
import '../../styles/Modal.css'
import { ChangePassword } from '../changePassword';

const ModalChangePassword = ({ userId, handleChangePassword }) => {

    return (
        <div className='modal-container' >
            <div className='modals'>
                <ChangePassword userId={userId} handleChangePassword={handleChangePassword} />
            </div>
        </div >
    )

}

export default ModalChangePassword;