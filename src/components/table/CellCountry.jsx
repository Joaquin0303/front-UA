import React from "react";

const CellCountry = ({ country }) => {

    return (
        <td>{country && country.descripcion}</td>
    );
}

export default CellCountry;