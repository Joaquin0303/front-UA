import React, { useState, useEffect } from "react";

const CellAge = ({ ageData }) => {

    const [ages, setAges] = useState([]);

    useEffect(() => {
        if (ageData && ageData.length > 0) {
            setAges(ageData.split(','));
        }
    }, [ageData]);

    const toArray = (d) => {
        ageData && ageData.length > 0 && ageData.split(',')
    }
    return (
        <td>
            {ages.map((r, i) => {
                if (r)
                    return <span key={i}>{r} {i < (ages.length - 1) ? ',' : ''}</span>
            })}
        </td>
    );
}

export default CellAge;