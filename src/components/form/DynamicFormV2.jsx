import React, { useState, useEffect } from 'react';
import InputText from './InputText';
import InputSequencer from './InputSequencer';
import InputParameterType from './InputParameterType';
import InputParameter from './InputParameter';
import { getParameters } from '../../services/ParameterServices';
import InputRole from './InputRole';
import InputPermission from './InputPermission';
import InputDate from './InputDate';
import InputNumber from './InputNumber';
import InputCountry from './InputCountry';
import InputFileNumber from './InputFileNumber';
import InputSelect from './InputSelect';
import InputPosition from './InputPosition';
import InputPositionLead from './InputPositionLead';
import InputParameterSearch from './InputParameterSearch';
import InputParameterByDirection from './InputParameterByDirection';
import InputPassword from './InputPassword';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import InputCheckbox from './InputCheckbox';
import InputRadioButton from './InputRadioButton';

const DynamicFormV2 = ({ formConfiguration, data, closeModal, onSubmitForm, actionForm }) => {

    const [validation, setValidation] = useState();
    const [formData, setFormData] = useState(data);
    const [parameterList, setParameterList] = useState([]);
    const [fieldUpdated, setFieldUpdated] = useState();

    const showField = (fieldName) => {
        if (!formConfiguration.ignoreOnEdit || actionForm != TABLE_ACTIONS.EDIT || !formConfiguration.ignoreOnEdit.includes(fieldName))
            return (formConfiguration.activeFields.includes(fieldName) && data.activo) ||
                (formConfiguration.inactiveFields.includes(fieldName) && !data.activo);
        else
            return false;
    }

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFieldUpdated({ key: key, value: value })
        setFormData({ ...formData });
    }

    const submitForm = () => {
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
                const fieldType = formConfiguration.getFieldTypeByName(key);
                const fieldDisabled = fieldType.disabled && fieldType.disabled.edit && data.id && data.id > 0;
                switch (fieldType.type) {
                    case 'fileNumber':
                        return <InputFileNumber key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'string':
                        return <InputText key={i} validation={validation} name={key} updateFormData={updateFormData} value={formData[key]} />
                    case 'password':
                        return <InputPassword key={i} validation={validation} name={key} updateFormData={updateFormData} value={formData[key]} />
                    case 'number':
                        return <InputNumber disabled={fieldDisabled} key={i} validation={validation} name={key} updateFormData={updateFormData} value={formData[key]} />
                    case 'parameter':
                        return <InputParameter key={i} validation={validation} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == fieldType.code)} updateFormData={updateFormData} />
                    case 'parameterByDirection':
                        return <InputParameterByDirection key={i} validation={validation} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == fieldType.code)} updateFormData={updateFormData} direction={formData[fieldType.direction]} />
                    case 'parameter.search':
                        return <InputParameterSearch key={i} validation={validation} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == fieldType.code)} updateFormData={updateFormData} />
                    case 'calendar':
                        return <InputDate key={i} validation={validation} name={key} updateFormData={updateFormData} value={formData[key]} />
                    case 'parameterType':
                        return <InputParameterType key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'position':
                        return <InputPosition key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} fieldUpdated={fieldUpdated} />
                    case 'leaderPosition':
                        return <InputPositionLead key={i} validation={validation} name={key} value={formData[key]} category={formData['codigoCategoria']} updateFormData={updateFormData} fieldUpdated={fieldUpdated} currentPositionId={formData['id']} />
                    case 'role':
                        return <InputRole key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'permission':
                        return <InputPermission key={i} validation={validation} value={formData[key]} name={key} updateFormData={updateFormData} />
                    case 'select':
                        return <InputSelect key={i} multivalue={fieldType.multivalue} validation={validation} name={key} value={formData[key]} options={fieldType.options} updateFormData={updateFormData} />;
                    case 'country':
                        return <InputCountry key={i} multiple={fieldType.multivalue} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />;
                    case 'sequencer':
                        return <InputSequencer key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'checkbox':
                        return <InputCheckbox key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    case 'radiobutton':
                        return <InputRadioButton key={i} validation={validation} name={key} value={formData[key]} updateFormData={updateFormData} />
                    default:
                }
            }
        });
        return cells;
    }

    return (
        <div className='div-width'>
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

export default DynamicFormV2;