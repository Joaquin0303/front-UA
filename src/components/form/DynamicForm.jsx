import React, { useState } from 'react';
import i18n from "../../localization/i18n";
import InputText from './InputText';
import InputSwitch from './InputSwitch';
import InputSequencer from './InputSequencer';
import InputParameterType from './InputParameterType';

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
            switch (key) {
                case 'secuenciador':
                    return <InputSequencer key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                case 'tipoParametro':
                    return <InputParameterType key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                default:
                    if (!Array.isArray(value) && key != 'id' && key != 'activo' && !key.startsWith('fecha')) {
                        if (typeof value == 'boolean') {
                            return <InputSwitch key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'string') {
                            return <InputText key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
                        }
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