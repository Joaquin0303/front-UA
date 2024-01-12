import React from "react";
import CellPositionCode from "./CellPositionCode";
import CellParameter from "./CellParameter";
import CellDate from "./CellDate";


const CellDynamicEmployee = ({ employee, fields }) => {

    const buildCell = () => {
        if (fields.length > 1) {
            return (
                <td>
                    <span>
                        {fields.map(f => {
                            return employee[f] + ' ';
                        })}
                    </span>
                </td>
            )
        } else {
            switch (fields[0]) {
                case 'codigoPuesto':
                    return <CellPositionCode position={employee[fields[0]]} />
                case 'codigoDireccion':
                    return <CellParameter parameter={employee[fields[0]]} />
                case 'fechaEgreso':
                    return <CellDate value={employee[fields[0]]} />
                default:
                    return (
                        <td>
                            <span>
                                {fields.map(f => {
                                    return employee[f] + ' ';
                                })}
                            </span>
                        </td>
                    )
            }
        }
    }

    return (
        buildCell()
    )
}

export default CellDynamicEmployee;