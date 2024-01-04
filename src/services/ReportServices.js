
const useMock = true;

export const backToSchoolReportService = async (filter) => {
    console.log("Filter backToSchoolReportService");
    if (useMock) return backToSchoolMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const costCenterReportService = async (filter) => {
    console.log("Filter costCenterReportService");
    if (useMock) return costCenterMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const employmentHistoryReportService = async (filter) => {
    console.log("Filter employmentHistoryReportService");
    if (useMock) return employmentHistoryMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const internationalDataCollectionReportService = async (filter) => {
    console.log("Filter internationalDataCollectionReportService");
    if (useMock) return internationalDataCollectionMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const externalReportService = async (filter) => {
    console.log("Filter externalReportService");
    if (useMock) return externalMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const directorsReportService = async (filter) => {
    console.log("Filter directorsReportService");
    if (useMock) return directorsMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const genericReportService = async (filter) => {
    console.log("Filter genericReportService");
    if (useMock) return genericMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const licencesReportService = async (filter) => {
    console.log("Filter licencesReportService");
    if (useMock) return licencesMockData;
    const result = await axios({
        method: 'get',
        url: host + '/ua/report',
        data: {
            filter
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}


const backToSchoolMockData = {
    list: [
        {
            numeroLegajo: 10001,
            apellido: 'Garcia',
            nombre: 'Ramiro',
            hijos: 2,
            edades: [5, 9],
            codigoPais: {
                "id": 1,
                "codigo": "ARG",
                "descripcion": "Argentina",
                "secuenciador": {
                    "id": 1,
                    "codigo": "S1",
                    "rangoDesde": 20,
                    "rangoHasta": 19999,
                    "secuencia": 27,
                    "activo": true
                },
                "activo": true
            },
            activo: true
        },
        {
            numeroLegajo: 10002,
            apellido: 'Hernandez',
            nombre: 'Lidia',
            hijos: 0,
            edades: [],
            codigoPais: {
                "id": 1,
                "codigo": "ARG",
                "descripcion": "Argentina",
                "secuenciador": {
                    "id": 1,
                    "codigo": "S1",
                    "rangoDesde": 20,
                    "rangoHasta": 19999,
                    "secuencia": 27,
                    "activo": true
                },
                "activo": true
            },
            activo: true
        },
        {
            numeroLegajo: 10003,
            apellido: 'Rojas',
            nombre: 'Belen',
            hijos: 1,
            edades: [7],
            codigoPais: {
                "id": 1,
                "codigo": "ARG",
                "descripcion": "Argentina",
                "secuenciador": {
                    "id": 1,
                    "codigo": "S1",
                    "rangoDesde": 20,
                    "rangoHasta": 19999,
                    "secuencia": 27,
                    "activo": true
                },
                "activo": true
            },
            activo: true
        },
        {
            numeroLegajo: 10004,
            apellido: 'Asis',
            nombre: 'Carlos',
            hijos: 2,
            edades: [10, 13, 19],
            codigoPais: {
                id: 1,
                codigo: "ARG",
                descripcion: "Argentina",
                secuenciador: {
                    id: 1,
                    codigo: "S1",
                    rangoDesde: 20,
                    rangoHasta: 19999,
                    secuencia: 27,
                    activo: true
                },
                activo: true
            },
            activo: true
        }
    ]
}

const costCenterMockData = {
    list: [
        {
            numeroLegajo: 10004,
            apellido: 'Asis',
            nombre: 'Carlos',
            codigoDireccion: {
                id: 1
            },
            codigoGerencia: {
                id: 1
            },
            codigoCentroDeCosto: {
                id: 1
            },
            fte: {
                id: 1
            }
        }
    ]


}

const employmentHistoryMockData = {
    list: [{
        numeroLegajo: 10004,
        apellido: 'Asis',
        nombre: 'Carlos',
        codigoPuesto: {
            id: 1
        },
        fechaDesde: '',
        fechaHasta: ''
    }]
}

const internationalDataCollectionMockData = {
    list: []
}

const externalMockData = {
    list: [{
        numeroLegajo: 10004,
        apellido: 'Asis',
        nombre: 'Carlos',
        //FALTA DEPARTAMENTO
        codigoPuesto: {
            id: 1
        },
        codigoTipoDocumento: {
            id: 1
        },
        numeroDocumento: '',
        codigoPais: {
            id: 1
        },
        codigoProveedor: {
            id: 1
        },
        codigoPuesto: {
            id: 1
        },
        codigoDivision: {
            id: 1
        },
        codigoDireccion: {
            id: 1
        },
        codigoGerencia: {
            id: 1
        },
        codigoJefatura: {
            id: 1
        },
        activo: true,
        fechaIngreso: '',
        codigoGenero: {
            id: 1
        },
        fechaEgreso: '',
        emailPersonal: ''
    }
    ]
}

const directorsMockData = {
    list: [
        {
            numeroLegajo: 10004,
            apellido: 'Asis',
            nombre: 'Carlos',
            fechaIngreso: '',
            fechaIngresoReconocida: '',
            codigoPais: {
                id: 1
            },
            codigoOficina: { // Lugar de trabajo
                id: 1
            },
            emailLaboral: '',
            codigoPuesto: { // Descripcion
                id: 1
            },
            codigoCategoriaEmpleado: {
                id: 1
            },
            codigoPuestoJefe: { // A Quien reporta ?
                id: 1
            },
            codigoDireccion: {
                id: 1
            },
            codigoGerencia: {
                id: 1
            },
            codigoJefatura: {
                id: 1
            },
            codigoDivision: {
                id: 1
            },
            codigoCentroDeCosto: {
                id: 1
            },
            // Falta? Subcentro de Costo = null
            codigoConvenio: {
                id: 1
            },
            // Categoría - Repetido? 
        }
    ]
}

const genericMockData = {
    list: []
}

const licencesMockData = {
    list: [
        {
            numeroLegajo: 10004,
            apellido: 'Asis',
            nombre: 'Carlos',
            tipoLicencia: {
                id: 1
            },
            fechaInicio: '',
            fechaFin: '',
            codigoEstadoEmpleado: {
                id: 87
            },
            codigoPais: {
                id: 1
            },
            codigoPuesto: {
                id: 1
            },
            codigoDireccion: {
                id: 1
            },
            codigoGerencia: {
                id: 1
            },
            codigoJefatura: {
                id: 1
            }
        }
    ]
}