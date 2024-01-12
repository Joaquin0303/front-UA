import React from "react";

const CellAge = ({ ageData }) => {

    return (
        <td>
            {ageData && ageData.length > 0 && ageData.split(',').map((r, i) => {
                return <span key={i}>{r},</span>
            })}
        </td>
    );
}

export default CellAge;