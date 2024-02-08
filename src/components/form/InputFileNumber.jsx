import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getEmployees } from "../../services/EmployeeServices";

const InputFileNumber = ({ validation, name, value, updateFormData }) => {

    const [employeeList, setEmployeeList] = useState([]);
    const [employeeNames, setEmployeeNames] = useState(null);

    const employeeSelectorChangeHandler = (e) => {
        const emp = getEmploeeByFileNumber(e.target.value);
        if (emp) {
            setEmployeeNames(emp.apellido + ' ' + emp.nombre);
            updateFormData(name, e.target.value);
        } else {
            setEmployeeNames(null);
            updateFormData(name, null);
        }
    }

    useEffect(() => {
        getEmployees().then(result => {
            if (result.list)
                setEmployeeList(result.list.filter(empl => empl.codigoEstadoEmpleado.id == 87));
        })
    }, []);

    useEffect(() => {
        if (employeeList.length > 0 && !getEmploeeByFileNumber(value)) {
            updateFormData(name, null);
        }
    }, [employeeList]);

    const getEmploeeByFileNumber = (fileNumber) => {
        return employeeList.find(emp => emp.numeroLegajo == fileNumber);
    }

    return (
        <div className='form-group'>
            <label className='label' htmlFor="id">{i18n.t(name)}</label>
            <input list="ice-cream-flavors" type="text" name={name} value={value} onChange={employeeSelectorChangeHandler} />
            {employeeNames && <div className='undertext'>
                <span className='label' >Empleado: </span><span>{employeeNames}</span>
            </div>}
            {validation && validation[name] && <div className="form-field-error-msg">{validation[name]}</div>}
            <datalist id="ice-cream-flavors">
                {employeeList.map((emp, i) => {
                    return <option key={i} value={emp.numeroLegajo} >{emp.apellido} {emp.nombre}</option>
                })}
            </datalist>
        </div>
    );
}


export default InputFileNumber;