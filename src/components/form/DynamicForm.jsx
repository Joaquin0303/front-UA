import React, { useState, useEffect } from 'react';
import i18n from "../../localization/i18n";
import InputText from './InputText';
import InputSwitch from './InputSwitch';
import InputSequencer from './InputSequencer';
import InputParameterType from './InputParameterType';
import InputParameter from './InputParameter';
import { getParameters } from '../../services/ParameterServices';
import InputRole from './InputRole';
import InputPermission from './InputPermission';
import InputPositionCode from './InputPositionCode';
import InputDate from './InputDate';
import InputNumber from './InputNumber';

const DynamicForm = ({ pageName, data, setModal, disabled, onSubmitForm }) => {

    const [formData, setFormData] = useState(data);
    const [parameterList, setParameterList] = useState([]);

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

    useEffect(() => {
        getParameters().then(result => {
            setParameterList(result.list);
        });
    }, []);

    const createInputFields = () => {
        const cells = Object.keys(data).map((key, i) => {
            const value = data[key];

            switch (key) {
                case 'secuenciador':
                    return <InputSequencer key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                case 'tipoParametro':
                    return <InputParameterType key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                case 'codigoDireccion':
                    return <InputParameter key={i} name={key} value={formData[key]} disabled={disabled} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} />
                case 'codigoGerencia':
                    return <InputParameter key={i} name={key} value={formData[key]} disabled={disabled} parameterList={parameterList.filter(p => p.tipoParametro.id == 12)} updateFormData={updateFormData} />
                case 'codigoJefatura':
                    return <InputParameter key={i} name={key} value={formData[key]} disabled={disabled} parameterList={parameterList.filter(p => p.tipoParametro.id == 14)} updateFormData={updateFormData} />
                case 'codigoCategoria':
                    return <InputParameter key={i} name={key} value={formData[key]} disabled={disabled} parameterList={parameterList.filter(p => p.tipoParametro.id == 3)} updateFormData={updateFormData} />
                case 'roles':
                    if (pageName != 'Permisos')
                        return <InputRole key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                    break;
                case 'permisos':
                    return <InputPermission key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} />
                case 'codigoPuestoAlQueReporta':
                    return <InputPositionCode key={i} name={key} value={formData[key]} disabled={disabled} updateFormData={updateFormData} directionCode={formData['codigoDireccion']} />
                default:
                    if (key != 'id' && key != 'activo' && key != 'fechaAlta'
                        && (pageName != 'parameterType' || key != 'codigo')
                    ) {
                        if (key.startsWith('fechaBaja')) {
                            return <InputDate key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'boolean') {
                            return <InputSwitch key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'string') {
                            return <InputText key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'number') {
                            return <InputNumber key={i} disabled={disabled} name={key} updateFormData={updateFormData} value={formData[key]} />
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