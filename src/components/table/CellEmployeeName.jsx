import React, { useState, useEffect } from "react";
import { getEmployees } from "../../services/EmployeeServices";

const CellEmployeeName = ({ numeroLegajo }) => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();

    useEffect(() => {
        getEmployees().then(r => {
            if (r.list) {
                setEmployees(r.list);
            }
        });

    }, []);

    useEffect(() => {
        setEmployee(employees.find(e => e.numeroLegajo == numeroLegajo && (e.codigoEstadoEmpleado.id == 87 || e.codigoEstadoEmpleado.id == 88)));
    }, [numeroLegajo, employees]);

    return (
        <>
            <td>{employee && employee.apellido} {employee && employee.nombre}</td>
        </>
    );
}

export default CellEmployeeName;