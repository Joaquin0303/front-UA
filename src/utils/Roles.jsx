
export const ROLES = {
    USER_ADMIN:
    {
        id: 1,
        name: 'Administrador Usuarios'
    },
    EMPLOYEE_ADMIN: {
        id: 2,
        name: 'Administrador de empleados'
    },
    REPORT_DIRECTOR: {
        id: 3,
        name: 'Reportes RRHH'
    },
    REPORT_DIRECTOR: {
        id: 4,
        name: 'Reportes Directores'
    },
    REPORT_DIRECTOR: {
        id: 5,
        name: 'Administrador Tablas Paramétricas'
    }

}

export const getRoleIdByName = (name) => {
    return Object.keys(ROLES).find(key => ROLES[key].name == name);
}