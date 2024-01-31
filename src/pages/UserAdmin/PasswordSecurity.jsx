import React from 'react';
import ABMPage from '../ABMPage';
import { addPaswordSecurity, getPaswordSecurity, updatePaswordSecurity } from '../../services/LoginAndSecurityServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

export const LoadPasswordSecurityModel = {
  patron: '',
  fechaValidezInicio: '',
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
    type: 'string'
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
    },
    activeRows: [
      'patron',
      'fechaValidezInicio',
      'regla',
      'activo'
    ],
    inactiveRows: [],
    aditionalRows: [],
    sortRow: [
      'patron',
      'fechaValidezInicio',
      'regla',
      'activo'
    ]
  },
  formConfiguration: {
    getFieldTypeByName: getFieldTypeByName,
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'regla',
      'activo'
    ],
    inactiveFields: []
  },
  viewConfiguration: {
    activeFields: [
      'patron',
      'fechaValidezInicio',
      'regla',
      'activo'
    ],
    inactiveFields: []
  }
}

const PasswordSecurityPage = () => {
  const [loadPasswordSecurityList, setPasswordSecurityList] = useState([]);
  const [statusActive, setStatusActive] = useState(true);


  useEffect(() => {
    loadPasswordSecurity();
  }, [statusActive]);

  const loadPasswordSecurity = () => {
    getPaswordSecurity().then(result => {
      if (result && result.list) {
        // setPasswordSecurityList(result.list.filter(d => d.activo == statusActive && (d.empleado.codigoEstadoEmpleado.id == 87 || d.empleado.codigoEstadoEmpleado.id == 88)).sort(compare));
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

  const matchHandler = () => { }

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
      result.validation.fechaValidezInicio = "Ingrese fechaValidezInicio"
    }
    if (!data.regla || data.regla <= 0) {
      result.error = true;
      result.validation.regla = "Ingrese regla"
    }
    return result;
  }

  return (
    <ABMPage pageConfiguration={pageConfiguration} pageName="seguridadContrasena" dataList={loadPasswordSecurityList} dataModel={LoadPasswordSecurityModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
  );

}

export default PasswordSecurityPage;