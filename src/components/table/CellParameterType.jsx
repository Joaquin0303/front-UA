import React from "react";

const CellParameterType = ({ tipoParametroData }) => {

    return (
        <td>{tipoParametroData && tipoParametroData.descripcion}</td>
    );
}

export default CellParameterType;