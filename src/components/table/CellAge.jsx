import React from "react";

const CellAge = ({ ageData }) => {

    return (
        <td>
            {ageData && ageData.map((r, i) => {
                return <span key={i}>{r},</span>
            })}
        </td>
    );
}

export default CellAge;