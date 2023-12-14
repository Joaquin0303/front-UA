import React, { useState, useEffect } from "react";
import { getPositionById } from "../../services/PositionServices";

const CellPositionCode = ({ position }) => {

    return (
        <td>{position && position.descripcion}</td>
    );
}

export default CellPositionCode;