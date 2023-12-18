import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getEmployees } from "../../services/EmployeeServices";

const InputFileNumber = ({ validation, name, value, updateFormData }) => {

    const [employeeList, setEmployeeList] = useState([]);

    const employeeSelectorChangeHandler = (e) => {
        if (validateFileNumber(e.target.value)) {
            updateFormData(name, e.target.value);
        } else {
            updateFormData(name, null);
        }
    }

    useEffect(() => {
        getEmployees().then(result => {
            if (result.list)
                setEmployeeList(result.list);
        })
    }, []);

    useEffect(() => {
        if (employeeList.length > 0 && !validateFileNumber(value)) {
            updateFormData(name, null);
        }
    }, [employeeList]);

    const validateFileNumber = (fileNumber) => {
        return (employeeList.find(emp => emp.numeroLegajo == fileNumber) != null)
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input list="ice-cream-flavors" type="text" name={name} value={value} onChange={employeeSelectorChangeHandler} />
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id="ice-cream-flavors">
                {employeeList.map((emp, i) => {
                    return <option key={i} value={emp.numeroLegajo} >{emp.nombre} {emp.apellido}</option>
                })}
            </datalist>
        </div>
    );
}


export default InputFileNumber;