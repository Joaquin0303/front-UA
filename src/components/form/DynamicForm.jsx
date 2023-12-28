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
import InputCountry from './InputCountry';
import InputFileNumber from './InputFileNumber';

const DynamicForm = ({ formConfiguration, data, closeModal, onSubmitForm }) => {
    const [validation, setValidation] = useState();
    const [formData, setFormData] = useState(data);
    const [parameterList, setParameterList] = useState([]);

    console.log('formData=', formData);

    const showField = (fieldName) => {
        return (formConfiguration.activeFields.includes(fieldName) && data.activo) ||
            (formConfiguration.inactiveFields.includes(fieldName) && !data.activo);
    }

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        try {
            onSubmitForm(formData)
            closeModal();
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    useEffect(() => {
        getParameters().then(result => {
            setParameterList(result.list);
        });
    }, []);

    const createInputFields = () => {
        const cells = Object.keys(data).map((key, i) => {
            if (showField(key)) {
                const value = data[key];
                switch (key) {
                    case 'secuenciador':
                        return <InputSequencer validation={validation} key={i} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'tipoParametro':
                        return <InputParameterType validation={validation} key={i} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'codigoDireccion':
                        return <InputParameter validation={validation} key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} />
                    case 'codigoGerencia':
                        return <InputParameter validation={validation} key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 12)} updateFormData={updateFormData} />
                    case 'codigoJefatura':
                        return <InputParameter validation={validation} key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 14)} updateFormData={updateFormData} />
                    case 'codigoCategoria':
                        return <InputParameter validation={validation} key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 3)} updateFormData={updateFormData} />
                    case 'codigoCentroDeCosto':
                        return <InputParameter validation={validation} key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 4)} updateFormData={updateFormData} />
                    case "codigoPais":
                        return <InputCountry validation={validation} key={i} name={key} value={formData[key]} updateFormData={updateFormData} />;
                    case 'roles':
                        return <InputRole key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'permisos':
                        return <InputPermission key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'codigoPuestoAlQueReporta':
                        return <InputPositionCode validation={validation} key={i} name={key} value={formData[key]} updateFormData={updateFormData} directionCode={formData['codigoDireccion']} currentPositionId={formData['id']} />
                    case 'numeroLegajo':
                        return <InputFileNumber validation={validation} key={i} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'tipoLicencia':
                        return <InputParameter validation={validation} key={i} name="tipoLicencia" value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 16)} updateFormData={updateFormData} />
                    default:
                        if (key.startsWith('fecha')) {
                            return <InputDate validation={validation} key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'boolean') {
                            return <InputSwitch key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'string') {
                            return <InputText validation={validation} key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'number') {
                            return <InputNumber validation={validation} key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        }
                }
            }
        });
        return cells;
    }

    return (
        <div>
            <div className="modals-content">
                <div className='form scroll-shadows'>
                    <div className="form-field-container">
                        {validation && validation.genericError && <div>{validation.genericError}</div>}
                        {createInputFields()}
                    </div>
                </div>
            </div>
            <div className='modal-buttons'>
                {<button type='submit' className='btns' onClick={submitForm}>Confirmar</button>}
                {<button className='btns-close' onClick={closeModal}>Cerrar</button>}
            </div>
        </div>

    )
}

export default DynamicForm;