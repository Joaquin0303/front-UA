import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { addPaswordSecurity, getPaswordSecurity, updatePaswordSecurity } from '../../services/LoginAndSecurityServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import { compareStrDates } from '../../utils/Utils';

export const LoadPasswordSecurityModel = {
  patron: '',
  fechaValidezInicio: '',
  fechaValidezFin: '',
  regla: '',
  activo: true,
}

const ModelDefinition = [
  {
    fieldName: 'patron',
    type: 'string'
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
    fieldName: 'regla',
    type: 'string',
  },
  {
    fieldName: 'activo',
    type: 'string',
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
  show_active_button: true,
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
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla'
    ],
    inactiveRows: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla'
    ],
    aditionalRows: [],
    sortRow: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla'
    ]
  },
  formConfiguration: {
    getFieldTypeByName: getFieldTypeByName,
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla'
    ],
    inactiveFields: []
  },
  viewConfiguration: {
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla'
    ],
    inactiveFields: []
  }
}

const PasswordSecurity = () => {
  const [passwordSecurityList, setPasswordSecurityList] = useState([]);
  const [statusActive, setStatusActive] = useState(true);


  useEffect(() => {
    loadPasswordSecurity();
  }, [statusActive]);

  const loadPasswordSecurity = () => {
    getPaswordSecurity().then(result => {
      if (result && result.model) {
        setPasswordSecurityList([result.model]);
      }
    })
  }

  const onAdd = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    addPaswordSecurity(data).then(result => {
      console.log('saved=', result);
      loadPasswordSecurity();
    });
  }

  const onEdit = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    updatePaswordSecurity(data.id, data).then(result => {
      console.log('edited=', result);
      loadPasswordSecurity();
    });
  }

  const onRemove = () => { }

  const matchHandler = () => {
    return true;
  }

  const validate = (data) => {
    const result = {
      error: false,
      validation: {}
    };
    if (!data.patron || data.patron.trim().length <= 0) {
      result.error = true;
      result.validation.patron = "Ingrese patrón"
    }
    if (!data.fechaValidezInicio || data.fechaValidezInicio.trim().length <= 0) {
      result.error = true;
      result.validation.fechaValidezInicio = "Ingrese fecha de inicio de validez"
    }
    if (!data.fechaValidezFin || data.fechaValidezFin.trim().length <= 0) {
      result.error = true;
      result.validation.fechaValidezFin = "Ingrese fecha de fin de validez"
    }
    if (data.fechaValidezInicio && data.fechaValidezFin && compareStrDates(data.fechaValidezInicio, data.fechaValidezFin) < 1) {
      result.error = true;
      result.validation.fechaValidezFin = "Ingrese una fecha fin mayor a la fecha de inicio"
    }
    if (!data.regla || data.regla <= 0) {
      result.error = true;
      result.validation.regla = "Ingrese regla"
    }
    return result;
  }

  console.log('passwordSecurityList', passwordSecurityList)
  return (
    <ABMPage pageConfiguration={pageConfiguration} pageName="seguridadContrasena" dataList={passwordSecurityList} dataModel={LoadPasswordSecurityModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
  );

}

export default PasswordSecurity;