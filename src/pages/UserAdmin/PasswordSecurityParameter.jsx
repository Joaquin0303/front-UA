import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getPaswordSecurityParam, addPaswordSecurityParam, updatePaswordSecurityParam } from '../../services/LoginAndSecurityServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

export const PasswordParamModel = {
  diasValidezContrasena: '',
  cantidadReintentos: '',
  fechaValidezInicio: null,
  fechaValidezFin: null,
  activo: 1
}

const ModelDefinition = [
  {
    fieldName: 'diasValidezContrasena',
    type: 'number'
  },
  {
    fieldName: 'cantidadReintentos',
    type: 'number'
  },
  {
    fieldName: 'fechaValidezInicio',
    type: 'calendar'
  },
  {
    fieldName: 'fechaValidezFin',
    type: 'calendar'
  },
  {
    fieldName: 'activo',
    type: 'select',
    multivalue: false,
    options: [
      {
        value: 1,
        label: 'Si'
      },
      {
        value: 0,
        label: 'No'
      }
    ]
  }
]

const getFieldTypeByName = (fieldName) => {
  const field = ModelDefinition.find(d => d.fieldName == fieldName);
  if (field) return field;
  else return null;
}

const pageConfiguration = {
  show_search: false,
  show_add_button: true,
  show_active_button: false,
  tableConfiguration: {
    getFieldTypeByName: getFieldTypeByName,
    actions: {
      activeActions: [
        TABLE_ACTIONS.EDIT
      ],
      inactiveActions: [
        TABLE_ACTIONS.EDIT
      ],
    },
    activeRows: [
      'diasValidezContrasena',
      'cantidadReintentos',
      'fechaValidezInicio',
      'fechaValidezFin',
      'activo'
    ],
    inactiveRows: [
      'diasValidezContrasena',
      'cantidadReintentos',
      'fechaValidezInicio',
      'fechaValidezFin',
      'activo'
    ],
    aditionalRows: [

    ],
    sortRow: [

    ]
  },
  formConfiguration: {
    getFieldTypeByName: getFieldTypeByName,
    activeFields: [
      'diasValidezContrasena',
      'cantidadReintentos',
      'fechaValidezInicio',
      'fechaValidezFin',
      'activo'
    ],
    inactiveFields: [
      'diasValidezContrasena',
      'cantidadReintentos',
      'fechaValidezInicio',
      'fechaValidezFin',
      'activo'
    ]
  }
}



const ParameterSercurityPassword = () => {

  const [parameterPasswordList, setParameterPasswordList] = useState([]);
  const [statusActive, setStatusActive] = useState(true);

  useEffect(() => {
    parameterPassword();
  }, [statusActive]);

  const parameterPassword = () => {
    getPaswordSecurityParam().then(result => {
      if (result && result.list)
        setParameterPasswordList(result.list);
    });
  }

  const onAdd = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    addPaswordSecurityParam(data).then(result => {
      console.log('saved=', result);
      parameterPassword();
    });
  }

  const onEdit = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    updatePaswordSecurityParam(data.id, data).then(result => {
      console.log('edited=', result);
      parameterPassword();
    });
  }

  const onRemove = () => {
    console.log('removed')
  }

  const matchHandler = () => {
    return true;
  }

  const validate = (data) => {
    const result = {
      error: false,
      validation: {}
    }
    if (!data.diasValidezContrasena || data.diasValidezContrasena <= 0) {
      result.error = true;
      result.validation.diasValidezContrasena = 'Ingrese un número de días valido'
    }
    if (!data.cantidadReintentos || data.cantidadReintentos <= 0) {
      result.error = true;
      result.validation.cantidadReintentos = 'Ingrese una cantidad de reintentos valida'
    }
    if(!data.fechaValidezInicio || !data.fechaValidezInicio.trim().length <= 0){
      result.error = true;
      result.validation.fechaValidezInicio = 'Ingrese una fecha de inicio valida'
    }
    if(!data.fechaValidezFin || !data.fechaValidezFin.trim().length <= 0){
      result.error = true;
      result.validation.fechaValidezFin = 'Ingrese una fecha de fin valida'
    }
    return result;
  }

  return (
    <ABMPage pageConfiguration={pageConfiguration} pageName="PasswordSecurityParam" dataList={parameterPasswordList} dataModel={PasswordParamModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
  )
}

export default ParameterSercurityPassword;