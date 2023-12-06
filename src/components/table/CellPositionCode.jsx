import React, { useState, useEffect } from "react";
import { getPositionById } from "../../services/PositionServices";

const CellPositionCode = ({ positionId }) => {
    console.log(positionId);
    const [position, setPosition] = useState();

    useEffect(() => {
        if (positionId)
            getPositionById(positionId).then(result => {
                setPosition(result);
            })
    }, []);
    return (
        <td>{position && position.model && position.model.descripcion}</td>
    );
}

export default CellPositionCode;