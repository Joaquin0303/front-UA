import React, { useState, useEffect } from "react";
import { getParameterById } from "../../services/ParameterServices";
const CellParameter = ({ parameterId }) => {

    const [parameter, setParameter] = useState();

    useEffect(() => {
        getParameterById(parameterId).then(result => {
            setParameter(result);
        })
    }, []);
    return (
        <td>{parameter && parameter.model.descripcion}</td>
    );
}

export default CellParameter;