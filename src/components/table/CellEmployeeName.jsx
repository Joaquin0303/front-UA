import React, { useState, useEffect } from "react";
import { searchEmployee } from "../../services/EmployeeServices";

const CellEmployeeName = ({ numeroLegajo }) => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();

    useEffect(() => {
        if (numeroLegajo)
            searchEmployee(numeroLegajo).then(r => {
                if (r.list) {
                    setEmployee(r.list[0]);
                }
            });

    }, [numeroLegajo]);

    return (
        <>
            <td>{employee && employee.apellido} {employee && employee.nombre}</td>
        </>
    );
}

export default CellEmployeeName;