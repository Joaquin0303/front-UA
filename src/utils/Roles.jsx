
export const ROLES = {
    USER_ADMIN:
    {
        id: 1,
        name: 'Administrador Usuarios'
    },
    EMPLOYEE_ADMIN: {
        id: 2,
        name: 'employee-admin'
    },
    REPORT_DIRECTOR: {
        id: 3,
        name: 'director-report'
    }
}

export const getRoleIdByName = (name) => {
    return Object.keys(ROLES).find(key => ROLES[key].name == name);
}