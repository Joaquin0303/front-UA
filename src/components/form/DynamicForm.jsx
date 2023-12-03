import React, { useState } from 'react';
import i18n from "../../localization/i18n";

const DynamicForm = ({ data, setModal, disabled, onSubmitForm }) => {

    const [formData, setFormData] = useState(data);

    console.log('formData=', formData);

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        onSubmitForm(formData);
        setModal(false);
    }

    const createInputFields = () => {
        const cells = Object.keys(data).map((key, i) => {
            const value = data[key];
            if (!Array.isArray(value) && key != 'id' && key != 'activo' && !key.startsWith('fecha')) {
                if (typeof value == 'boolean') {
                    return <div key={i} className='form-check form-switch'>
                        <label className='label' htmlFor="id">{i18n.t(key)}</label>
                        <input disabled={disabled} type='checkbox' className='form-check-input' value='' checked={formData[key]} onChange={(e) => updateFormData(key, e.target.checked)} />
                    </div>
                } else if (typeof value == 'string') {
                    return <div className='form-group' key={i}>
                        <label className='label' htmlFor="id">{i18n.t(key)}</label>
                        <input disabled={disabled} type="text" name={key} value={formData[key]} onChange={(e) => updateFormData(key, e.target.value)} />
                    </div>
                }

            }
        });
        return cells;
    }

    return (
        <div className='form'>
            {createInputFields()}
            <div className='botones-conf-close'>
                {<button type='submit' className='btns' onClick={submitForm} >Confirmar</button>}
                <button className='btns-close' onClick={() => { setModal(false) }} >Cerrar</button>
            </div>
        </div>
    )
}

export default DynamicForm;