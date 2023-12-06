import React from "react";

const CellPermission = ({ permissionData }) => {

    return (
        <td>
            <ul>
                {permissionData && permissionData.map((p, i) => {
                    return <li key={i}>{p.descripcion}</li>
                })}
            </ul>
        </td>
    );
}

export default CellPermission;