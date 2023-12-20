import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getEmployees, addEmployee, updateEmployee, getEmployeeById, removeEmployee } from '../../services/EmployeeServices';
import { getCurrentSequence, updateSequencer } from '../../services/SequencerServices';
import { getCountries } from '../../services/CountryServices';
import { addExcludedIncome } from '../../services/ExcludedIncomeServices';
let employeeTotalList = [];
export const findByFileNumber = (fileNumber) => {
    return employeeTotalList.find(e => e.numeroLegajo == fileNumber);
}

export const findByIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoPersonal == docNumber);
}

export const findByLaboralIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoLaboral == docNumber);
}

const EmployeesPage = ({ }) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    console.log('employeeList', employeeList);
    useEffect(() => {
        loadEmployees();
    }, [statusActive]);

    const loadEmployees = () => {
        getEmployees().then(result => {
            if (result.list) {
                employeeTotalList = result.list;
                setEmployeeList(result.list.filter(d => (!statusActive && d.codigoEstadoEmpleado.id != 87) || (statusActive && d.codigoEstadoEmpleado.id == 87)));
            }
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;

        data.codigoEstadoEmpleado = {
            id: 87
        }

        data.fechaIngresoReconocida = data.fechaIngreso;

        // REMOVE AFTER DATABASE FIXED
        data.codigoCentroDeCosto = {
            id: 55
        }

        getCountries().then(rCountries => {
            getCurrentSequence(
                rCountries.list.find(c => c.id == data.codigoPais.id).secuenciador.codigo
            ).then(seq => {
                data.numeroLegajo = seq.model.secuencia + 1;
                addEmployee(data).then(result => {
                    console.log('Employee added=', result);
                    loadEmployees();
                    updateSequencer(seq.model.id, seq.model.codigo, seq.model.rangoDesde, seq.model.rangoHasta, seq.model.secuencia + 1, seq.model.activo);
                });
            });

        })


    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        const employeeId = data.id;
        delete data["id"];
        updateEmployee(employeeId, data).then(empResult => {
            console.log('Employee updated=', empResult);
            if (empResult && empResult.model && empResult.model.codigoTipoEgreso && empResult.model.codigoTipoEgreso.id == 202) {
                addExcludedIncome(empResult.model, empResult.model.codigoTipoEgreso.descripcion, empResult.model.observaciones, true).then(excludeResult => {
                    console.log('Excluded Income added=', excludeResult);
                });
            }
            loadEmployees();
        })
    }

    const onRemove = (data) => {
        removeEmployee(data.id).then(result => {
            console.log('Employee removed=', result);
            loadEmployees();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.numeroLegajo == lowerCaseSearchTerm || (data.nombre + data.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        }

        return result;
    }

    return (
        <ABMPage pageName="Empleados" dataList={employeeList} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default EmployeesPage;