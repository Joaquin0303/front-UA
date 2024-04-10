import React, { useState } from "react";
import CellPositionCode from "./CellPositionCode";
import CellParameter from "./CellParameter";
import CellDate from "./CellDate";


const CellDynamicEmployee = ({ employee, fields }) => {
    const [emp, setEmp] = useState();

    let promise = Promise.resolve(employee);
    promise.then(function (val) {
        setEmp(val);
    });

    const getFieldValue = (field) => {
        if (emp)
            return emp[field];
        else
            return '';
    }

    const getPositionFieldValue = (field) => {
        console.log('position',)
        if (emp && emp.codigoPuesto)
            return emp.codigoPuesto[field];
        else
            return '';
    }

    const buildCell = () => {
        if (fields.length > 1) {
            return (
                <td>
                    <span>
                        {fields.map(f => {
                            return getFieldValue([f]) + ' ';
                        })}
                    </span>
                </td>
            )
        } else {
            console.log('fields', fields);
            switch (fields[0]) {
                case 'codigoPuesto':
                    return <CellPositionCode position={getFieldValue([fields[0]])} />
                case 'codigoDireccion':
                    return <CellParameter parameter={getPositionFieldValue([fields[0]])} />
                case 'fechaEgreso':
                    return <CellDate value={getFieldValue([fields[0]])} />
                default:
                    return (
                        <td>
                            <span>
                                {fields.map(f => {
                                    return getFieldValue([f]) + ' ';
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