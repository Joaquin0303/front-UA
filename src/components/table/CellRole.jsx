import React from "react";

const CellRole = ({ roleData }) => {

    return (
        <td>
            <ul>
                {roleData && roleData.map((r, i) => {
                    return <li key={i}>{r.descripcion}</li>
                })}
            </ul>
        </td>
    );
}

export default CellRole;