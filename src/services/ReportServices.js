import axios from 'axios'
import { host } from '../Configs';
import { parseToday, parseTodayStr } from '../utils/Utils';

const useMock = true;

export const backToSchoolReportService = async (filter) => {
    console.log("Filter backToSchoolReportService:", filter);
    //if (useMock) return backToSchoolMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/vueltaalcolegio/generar',
        data: {
            'pais': filter.empleadoPais
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const costCenterReportService = async (filter) => {
    console.log("Filter costCenterReportService:", filter);
    //if (useMock) return costCenterMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/centrodecosto/generar',
        data: {
            "idDireccion": filter.codigoDireccion ? filter.codigoDireccion.id : null,
            "idCentroDeCosto": filter.centroDeCosto ? filter.centroDeCosto.id : null,
            "estado": filter.estado
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const employmentHistoryReportService = async (filter) => {
    console.log("Filter employmentHistoryReportService", filter);
    //if (useMock) return employmentHistoryMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/historiallaboral/generar',
        data: {
            'pais': filter.pais,
            'idDireccion': filter.codigoDireccion ? filter.codigoDireccion.id : null,
            'estado': filter.estado,
            'fechaIngresoDesde': filter.fechaDesde ? filter.fechaDesde : null,
            'fechaIngresoHasta': filter.fechaHasta ? filter.fechaHasta : null
        }

    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const internationalDataCollectionReportService = async (filter) => {
    console.log("Filter internationalDataCollectionReportService", filter);
    //if (useMock) return internationalDataCollectionMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/idc/generar',
        data: {
            fechaHasta: filter.fechaHasta ? filter.fechaHasta : parseTodayStr()
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const externalReportService = async (filter) => {
    console.log("Filter externalReportService: ", filter);
    //if (useMock) return externalMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/externos/generar',
        data: {
            activo: filter.estado
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
    //if (useMock) return directorsMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/directores/generar',
        data: {
            'estado': filter.estado,
            'idDireccion': filter.codigoDireccion ? filter.codigoDireccion.id : null,
            'idGerencia': filter.codigoGerencia ? filter.codigoGerencia.id : null
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    })
    return result.data;
}

export const genericReportService = async (filter) => {
    console.log("Filter genericReportService:", filter);
    //if (useMock) return genericMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/generico/generar',
        data: {
            'estadoEmpleado': filter.estado,
            'idDireccion': filter.codigoDireccion ? filter.codigoDireccion.id : null,
            'idGerencia': filter.codigoGerencia ? filter.codigoGerencia.id : null
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
    //if (useMock) return licencesMockData;
    const result = await axios({
        method: 'post',
        url: host + '/ua/reporte/licencias/generar',
        data: {
            'pais': filter.paisLicencia.id,
            'estadoEmpleado': filter.estadoEmpleado,
            'direccion': filter.codigoDireccion ? filter.codigoDireccion.id : null,
            'estadoLicencia': filter.estadoLicencia
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
            cantidadHijos: 5,
            edades: null,
            pais: "Argentina",
            activo: true
        },
        {
            numeroLegajo: 10002,
            apellido: 'Hernandez',
            nombre: 'Lidia',
            cantidadHijos: 12,
            edades: "5, 9",
            pais: "Argentina",
            activo: true
        },
        {
            numeroLegajo: 10003,
            apellido: 'Rojas',
            nombre: 'Belen',
            cantidadHijos: 62,
            edades: "5, 9",
            pais: "Argentina",
            activo: true
        },
        {
            numeroLegajo: 10004,
            apellido: 'Asis',
            nombre: 'Carlos',
            cantidadHijos: 15,
            edades: "5, 9",
            pais: "Argentina",
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