import React, { useState, useEffect } from "react";
import { getParameterById } from "../../services/ParameterServices";
const CellParameter = ({ parameter }) => {

    console.log(parameter);
    return (
        <td>{parameter && parameter.descripcion}</td>
    );
}

export default CellParameter;