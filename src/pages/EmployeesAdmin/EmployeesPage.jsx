import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getEmployees, addEmployee, updateEmployee, getEmployeeById, removeEmployee } from '../../services/EmployeeServices';

const EmployeesPage = ({ }) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    console.log('employeeList', employeeList);
    useEffect(() => {
        loadEmployees();
    }, [statusActive]);

    const loadEmployees = () => {
        getEmployees().then(result => {
            if (result.list)
                setEmployeeList(result.list.filter(d => (!statusActive && d.codigoEstadoEmpleado.id != 87) || (statusActive && d.codigoEstadoEmpleado.id == 87)));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;

        addEmployee(data).then(result => {
            console.log('Employee added=', result);
            loadEmployees();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        const employeeId = data.id;
        delete data["id"];
        updateEmployee(employeeId, data).then(result => {
            console.log('Employee updated=', result);
            loadEmployees();
        })
    }

    const onRemove = (data) => {
        removeEmployee(data.id).then(result => {
            console.log('Employee removed=', result);
            loadEmployees();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.numeroLegajo == lowerCaseSearchTerm || (data.nombre + data.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        if (!data.numeroLegajo) {
            result.error = true;
            result.validation.nombre = "Ingrese nombre de usuario"
        }
        if (!data.numeroLegajo) {
            result.error = true;
            result.validation.nombre = "Ingrese nombre de apellido"
        }
        if (!data.numeroLegajo?.trim()) {
            result.error = true;
            result.validation.numeroLegajo = "Ingrese numero de legajo"
        }
        return result;
    }

    return (
        <ABMPage pageName="Empleados" dataList={employeeList} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default EmployeesPage;