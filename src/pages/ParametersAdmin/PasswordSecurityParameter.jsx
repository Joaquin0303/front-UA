import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getPaswordSecurityParam, addPaswordSecurityParam, updatePaswordSecurityParam } from '../../services/LoginAndSecurityServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

export const PasswordParamModel = {
  diasValidezContrasena: '',
  cantidadReintentos: '',
  activo: true
}

const ModelDefinition = [
  {
    fieldName: 'diasValidezContrasena',
    type: 'number'
  },
  {
    fieldName: 'cantidadReintentos',
    type: 'number'
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

      ],
    },
    activeRows: [
      'diasValidezContrasena',
      'cantidadReintentos'
    ],
    inactiveRows: [

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
      'cantidadReintentos'
    ],
    inactiveFields: [
    ]
  }
}



const ParameterSercurityPassword = () => {

  const [ParameterPasswordList, setParameterPasswordList] = useState([]);
  const [statusActive, setStatusActive] = useState(true);

  useEffect(() => {
    parameterPassword();
  }, [statusActive]);

  const parameterPassword = () => {
    getPaswordSecurityParam().then(result => {
      if (result && result.list)
        setParameterPasswordList(result.list.filter(d => d.activo == statusActive));
    });
  }

  const onAdd = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    addPaswordSecurityParam(data.diasValidezContrasena, data.cantidadReintentos).then(result => {
      console.log('saved=', result);
      parameterPassword();
    });
  }

  const onEdit = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    updatePaswordSecurityParam(data.id, data.diasValidezContrasena, data.cantidadReintentos).then(result => {
      console.log('edited=', result);
      parameterPassword();
    });
  }

  const onRemove = () => {
    console.log('removed')
  }

  const matchHandler = () => {
    console.log('match')
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
      result.validation.diasValidezContrasena = 'Ingrese una cantidad de reintentos valida'
    }
    return result;
  }

  return (
    <ABMPage pageConfiguration={pageConfiguration} pageName="PasswordSecurityParam" dataList={ParameterPasswordList} dataModel={PasswordParamModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
  )
}

export default ParameterSercurityPassword;