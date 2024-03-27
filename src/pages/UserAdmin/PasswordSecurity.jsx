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
    type: 'checkbox',
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
      'regla',
      'activo'
    ],
    inactiveRows: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ],
    sortRow: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ]
  },
  formConfiguration: {
    getFieldTypeByName: getFieldTypeByName,
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ],
    inactiveFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ]
  },
  viewConfiguration: {
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ],
    inactiveFields: [
      'patron',
      'fechaValidezInicio',
      'fechaValidezFin',
      'regla',
      'activo'
    ]
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
      if (result && result.list) {
        setPasswordSecurityList(result.list);
      }
    })
  }

  const onAdd = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    addPaswordSecurity(data).then(result => {
      loadPasswordSecurity();
    }).catch(error => {
      alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
    });
  }

  const onEdit = (data) => {
    const validation = validate(data);
    if (validation.error) throw validation;
    updatePaswordSecurity(data.id, data).then(result => {
      loadPasswordSecurity();
    }).catch(error => {
      alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
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

  return (
    <ABMPage pageConfiguration={pageConfiguration} pageName="seguridadContrasena" dataList={passwordSecurityList} dataModel={LoadPasswordSecurityModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
  );

}

export default PasswordSecurity;