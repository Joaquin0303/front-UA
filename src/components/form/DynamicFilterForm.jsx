import React, { useState, useEffect } from "react";
import InputParameter from "./InputParameter";
import InputCountry from "./InputCountry";
import InputDate from './InputDate';
import { getParameters } from '../../services/ParameterServices';
import InputSwitch from './InputSwitch';
import '../../styles/Filter.css'
import InputActiveSelect from "./InputActiveSelect";

const DynamicFilterForm = ({ formConfiguration, filterDataModel, onSubmitForm }) => {
    const [formData, setFormData] = useState(filterDataModel);
    const [parameterList, setParameterList] = useState([]);

    useEffect(() => {
        getParameters().then(result => {
            setParameterList(result.list);
        });
    }, []);

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        try {
            onSubmitForm(formData)
        } catch (error) {
            console.error('error', error);
        }
    }

    const showField = (fieldName) => {
        return formConfiguration.activeFields.includes(fieldName);
    }

    const createInputFields = () => {
        const fields = Object.keys(filterDataModel).map((key, i) => {
            if (showField(key)) {
                const value = filterDataModel[key];
                switch (key) {
                    case 'codigoDireccion':
                        return <InputParameter key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} />
                    case 'codigoGerencia':
                        return <InputParameter key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 12)} updateFormData={updateFormData} />
                    case 'codigoCentroDeCosto':
                        return <InputParameter key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 4)} updateFormData={updateFormData} />
                    case 'codigoPais':
                        return <InputCountry key={i} name={key} value={formData[key]} updateFormData={updateFormData} />;
                    case 'codigoEstadoEmpleado':
                        return <InputParameter key={i} name={key} value={formData[key]} parameterList={parameterList.filter(p => p.tipoParametro.id == 8)} updateFormData={updateFormData} />
                    case 'activo':
                        return <InputActiveSelect key={i} name={key} value={formData[key]} updateFormData={updateFormData} />
                        break;
                    default:
                        if (key.startsWith('fecha')) {
                            return <InputDate key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        } else if (typeof value == 'boolean') {
                            return <InputSwitch key={i} name={key} updateFormData={updateFormData} value={formData[key]} />
                        }
                }
            }
        });
        return fields;
    }

    return (
        <>
            {
                Object.keys(filterDataModel).length > 0 && <div className="form-filter-container">
                    <div className='form-filter'>
                        {createInputFields()}
                        <button type='submit' className='btns' onClick={submitForm}>Aplicar</button>
                    </div>
                </div>
            }
        </>
    );
}

export default DynamicFilterForm;