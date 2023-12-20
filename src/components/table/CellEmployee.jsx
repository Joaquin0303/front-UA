import React from "react";

const CellEmployee = ({ employee }) => {

    return (
        <>
            <td>{employee && employee.numeroLegajo}</td>
            <td>{employee && employee.apellido} {employee && employee.nombre}</td>
        </>
    );
}

export default CellEmployee;