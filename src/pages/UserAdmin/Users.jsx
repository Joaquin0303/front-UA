import React, { useState, useEffect } from 'react';
import { getUsers, addUser, editUser, removeUser, unblockUser } from '../../services/UserServices';
import { assignRoleToUser } from '../../services/RoleServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import PopUp from '../../components/modal/PopUp';

const UserModel = {
    numeroLegajo: '',
    nombreUsuario: '',
    contrasena: '',
    confirmarContrasena: '',
    roles: [],
    activo: true
}

export const PasswordModel = {
    userId: null,
    contrasena: '',
    confirmarContrasena: '',
}

const ModelDefinition = [
    {
        fieldName: 'numeroLegajo',
        type: 'fileNumber'
    },
    {
        fieldName: 'nombreUsuario',
        type: 'string'
    },
    {
        fieldName: 'roles',
        type: 'role'
    },
    {
        fieldName: 'fechaAlta',
        type: 'calendar'
    },
    {
        fieldName: 'fechaBaja',
        type: 'calendar'
    },
    {
        fieldName: 'contrasena',
        type: 'password'
    },
    {
        fieldName: 'confirmarContrasena',
        type: 'password'
    },
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const pageConfiguration = {
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.EDIT,
                TABLE_ACTIONS.INACTIVATE,
                TABLE_ACTIONS.UNBLOCK
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.ACTIVATE,
            ],
        },
        activeRows: [
            'numeroLegajo',
            'nombreUsuario',
            'fechaAlta',
            'roles'
        ],
        inactiveRows: [
            'numeroLegajo',
            'nombreUsuario',
            'fechaAlta',
            'fechaBaja',
            'roles'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'numeroLegajo',
            'nombreUsuario',
            'roles',
            'contrasena',
            'confirmarContrasena'
        ],
        inactiveFields: [
            'contrasena',
            'confirmarContrasena'
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'nombreUsuario',
            'fechaAlta',
            'roles'
        ],
        inactiveFields: [
            'numeroLegajo',
            'nombreUsuario',
            'roles',
            'fechaAlta',
            'fechaBaja'
        ]
    }
}

const Users = () => {

    const [userList, setUserList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [counter, setCounter] = useState(10000);

    useEffect(() => {
        loadUsers();
    }, [statusActive]);
    const loadUsers = () => {
        getUsers().then(result => {
            console.log('result', result.list)
            if (result.list)
                setUserList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data, action) => {
        const validation = validate(data, action);
        if (validation.error) throw validation;
        addUser(data.numeroLegajo, data.nombreUsuario, data.activo, data.roles, data.contrasena).then(result => {
            console.log('user saved=', result);
            data.roles && data.roles.forEach(userRole => {
                assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                    console.log('role user saved=', result);
                    loadUsers();
                });
            });
            if (!data.roles || data.roles.length == 0) {
                loadUsers();
            }
        });
    }

    const onEdit = (data, action) => {
        console.log('action', action)
        switch (action) {
            case TABLE_ACTIONS.INACTIVATE:
                const inactivateValidation = validate(data, action);
                if (inactivateValidation.error) throw inactivateValidation;
                editUser(data.id, data.numeroLegajo, data.nombreUsuario, data.activo, data.roles).then(result => {
                    if (result.codigo == 200) {
                        data.roles && data.roles.forEach(userRole => {
                            assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                                console.log('role user saved=', result);
                                loadUsers();
                            });
                        });
                        if (!data.roles || data.roles.length == 0) {
                            loadUsers();
                        }
                    }
                })
                break;
            case TABLE_ACTIONS.EDIT:
                const validation = validate(data, action);
                if (validation.error) throw validation;
                editUser(data.id, data.numeroLegajo, data.nombreUsuario, data.activo, data.roles).then(result => {
                    if (result.codigo == 200) {
                        data.roles && data.roles.forEach(userRole => {
                            assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                                console.log('role user saved=', result);
                                loadUsers();
                            });
                        });
                        if (!data.roles || data.roles.length == 0) {
                            loadUsers();
                        }
                    }
                })
                break;
            case TABLE_ACTIONS.UNBLOCK:

                let continuar = confirm("¿Desea desbloquear y generar una nueva contraseña para el usuario " + data.nombreUsuario + "?");
                if (continuar) {
                    unblockUser(data.id).then(result => {
                        console.log('Desbloqueo', result)
                        if (result.codigo == 200 && result.model.contrasena) {
                            setPopupMessage(<div className='message-min-popup'><div>La contraseña se ha generado correctamente</div><div className='password-view'> {result.model.contrasena}</div><div className='btns-container'><button className='btns-close' onClick={() => { setShowPopup(false); }}>Cerrar</button></div></div>);
                        } else {
                            setPopupMessage(<div className='message-min-popup'><div>No se pudo realizar la accion requerida</div><div className='btns-container'><button className='btns-close' onClick={() => { setShowPopup(false); }}>Cerrar</button></div></div>);
                        }
                        setShowPopup(true);
                        loadUsers();
                    });
                }
                break;
        }

    }

    console.log('counter=', counter)

    const onRemove = (data) => {
        removeUser(data.id).then(result => {
            console.log('removed=', result);
            loadUsers();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.nombreUsuario?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data, action) => {
        const result = {
            error: false,
            validation: {}
        }
        if (!data.nombreUsuario?.trim()) {
            result.error = true;
            result.validation.nombreUsuario = "Ingrese nombre de usuario"
        }
        if (!data.numeroLegajo) {
            result.error = true;
            result.validation.numeroLegajo = "Ingrese un número de legajo válido"
        }
        if (userList.find(u => u.numeroLegajo == data.numeroLegajo && u.id != data.id)) {
            result.error = true;
            result.validation.numeroLegajo = "Ya existe un usuario con este número de legajo"
        }
        if (!data.roles || data.roles.length <= 0) {
            result.error = true;
            result.validation.roles = "Seleccione al menos un rol"
        }
        if (action == TABLE_ACTIONS.ADD) {
            if (!data.contrasena?.trim()) {
                result.error = true;
                result.validation.contrasena = "Ingrese contraseña de usuario"
            }
            if (!data.confirmarContrasena?.trim()) {
                result.error = true;
                result.validation.confirmarContrasena = "Ingrese confirmación de contraseña"
            }
            if (data.contrasena?.trim() && data.confirmarContrasena?.trim() && data.contrasena != data.confirmarContrasena) {
                result.error = true;
                result.validation.confirmarContrasena = "No coincide con la contraseña"
            }
        }
        return result;
    }

    return (
        <>

            <ABMPage pageConfiguration={pageConfiguration} pageName="Usuarios" dataList={userList} dataModel={UserModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
            {showPopup && <PopUp message={popupMessage} />}
        </>
    );
}

export default Users;

