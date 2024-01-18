import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'es',
    debug: false,

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      en: {
        translation: {}
      },
      es: {
        translation: {
          activo: "Activo",
          nombreUsuario: "Nombre de Usuario",
          numeroLegajo: 'Legajo',
          fechaAlta: "Fecha de Alta",
          fechaBaja: "Fecha de Baja",
          descripcion: "Descripción",
          codigo: "Código",
          tipoParametro: "Tipos de Parámetro",
          texto1: "Texto 1",
          texto2: "Texto 2",
          rangoDesde: "Desde",
          rangoHasta: "Hasta",
          secuencia: "Secuencia",
          codigoDireccion: "Dirección",
          codigoGerencia: "Gerencia",
          codigoJefatura: "Jefatura",
          codigoCategoria: "Categoría",
          codigoPuestoAlQueReporta: "Reporta a",
          secuenciador: "Secuenciador",
          permisos: 'Permisos',
          roles: "Roles",
          codigoCentroDeCosto: "Centro de Costo",
          codigoPais: "País",
          apellido: "Apellido",
          nombre: "Nombre",
          segundoNombre: "Segundo Nombre",
          nombrePreferido: "Nombre Preferido",
          codigoGenero: "Género",
          fechaNacimiento: "Fecha de Nacimiento",
          codigoGeneracion: "Generación",
          fechaIngreso: "Fecha de Ingreso",
          codigoTipoDocumento: "Tipo Doc",
          numeroDocumentoPersonal: "Nro. Doc. Personal",
          numeroDocumentoLaboral: "Nro. Doc. Laboral",
          codigoOficina: "Oficina",
          codigoCategoriaEmpleado: "Categoría del Empleado",
          codigoPuesto: "Puesto",
          codigoNacionalidad: "Nacionalidad",
          codigoPaisResidencia: "País Residencia",
          calleResidencia: "Calle Residencia",
          numeroResidencia: "Número Residencia",
          pisoResidencia: "Piso Residencia",
          departamentoResidencia: "Depto. Residencia",
          localidadResidencia: "Localidad Residencia",
          codigoProvincia: "Provincia",
          emailPersonal: "Email Personal",
          codigoEstadoCivil: "Estado Civil",
          codigoBanco: "Banco",
          cbu: "C.B.U.",
          fechaIngresoReconocida: "Fecha Ingreso Reconocida",
          codigoTipoContratacion: "Tipo Contratación",
          horasSemanales: "Horas Semanales",
          fte: "FTE",
          codigoFrecuenciaLiquidacion: "Frec. Liquidación",
          codigoTipoEmpleo: "Tipo Empleo",
          codigoTipoJornada: "Tipo Jornada",
          emailLaboral: "Email Laboral",
          codigoDivision: "División",
          codigoPrepaga: "Prepaga",
          codigoObraSocial: "Obra Social",
          codigoConvenio: "Convenio",
          codigoCategoriaConvenio: "Categoría Convenio",
          afiliadoSindicato: "Afiliado Sindicato",
          codigoGrado: "Grado",
          ingresoCaido: "Ingresos Caídos",
          cargaDeFamilia: "Carga de Familia",
          licenciaHistory: "Historial de Licencias",
          codigoTipoEgreso: "Motivo de Egreso",
          observaciones: "Observaciones",
          fechaEgreso: "Fecha de Egreso",
          tipoLicencia: "Tipo de Licencia",
          fechaInicio: "Fecha de inicio",
          fechaFin: "Fecha de fin",
          'vuelta-al-colegio': "Vuelta al Colegio",
          'centro-de-costo': 'Centro de Costo',
          directores: 'Directores',
          'historial-laboral': 'Historial Laboral',
          externos: 'Externos',
          generico: 'Genérico',
          'international-data-collection': 'International Data Collection',
          licencias: 'Licencias',
          codigoEstadoEmpleado: 'Estado',
          codigoParentesco: 'Parentesco',
          numeroDocumento: 'Nro. Doc',
          Parametros: 'Parámetros',
          paises: 'País',
          parameterType: "Tipos de Parámetros",
          Puesto: 'Puestos',
          external: "Empleado Externo",
          cambioDePuesto: "Historial de Cambios de Puesto",
          pais: 'País',
          cantidadHijos: 'Hijos',
          edades: 'Edades',
          direccion: 'Dirección',
          gerencia: 'Gerencia',
          descripcionCentroDeCosto: "Centro de Costo",
          puesto: 'Puesto',
          codigoProveedor: 'Proveedor',
          apellidoNombre: 'Apellido y Nombre',
          manager: 'Manager',
          startDate: 'Start Date',
          nombreEmpleado: 'Apellido y Nombre',
          documentoPersonal: 'Documento Personal',
          fechaEgresoExternal: 'Fecha de Egreso',
          empleadoPais: 'País',
          descripcionPais: 'País',
          descripcionPuesto: 'Puesto',
          descripcionManagerJefe: 'Manager/Jefe',
          descripcionCargoManagerJefe: 'Cargo Manager/Jefe',
          descripcionDireccion: 'Dirección',
          descripcionLicencia: 'Licencia',
          estado: 'Estado',
          jefatura: 'Jefatura',
          paisLicencia: 'País',
          centroDeCosto: 'Centro de costo',
          estadoLicencia: 'Estado licencia',
          estadoEmpleado: 'Estado empleado',
          fechaIngresoDesde: 'Fecha Ingreso Desde',
          fechaIngresoHasta: 'Fecha Ingreso Hasta',
          globalId: 'Global Id',
          title: 'Title',
          surname: 'Surname',
          firstName: 'First Name',
          country: 'Country',
          department: 'Department',
          positionTitle: 'Position Title',
          managerToReport: 'Reports to Manager Name/Email',
          cargoManagerToReport: 'Reports to Position Title',
          middleName: 'Middle Name',
          otherName: 'Other Name',
          preferedName: 'Prefered Name',
          dateOfBirth: 'Date Of Birth',
          gender: 'Gender',
          mailLaboral: 'Mail',
          horasDeTrabajo: 'Horas De Trabajo',
          rateFrecuency: 'Rate Frecuency',
          salaryBasePayRate: 'Salary Base Pay Rate',
          reasonForSalaryChange: 'Reason For Salary Change',
          employmentType: 'Employment Type',
          personnelType: 'Personnel Type',
          termDate: 'Term Date',
          termReason: 'Term Reason',
          antiguedad: 'Antigüedad',
          age: 'Age',
          generation: 'Generation',
          division: 'Division',
          generacion: 'Generación',
          nacionalidad: 'Nacionalidad',
          genero: 'Género',
          cuil: 'Documento Laboral',
          domicilio: 'Domicilio',
          provincia: 'Provincia',
          tipoContratacion: 'Tipo Contratación',
          frecuenciaLiquidacion: 'Frecuencia Liquidación',
          tipoEmpleo: 'Tipo Empleo',
          tipoJornada: 'Tipo Jornada',
          lugarDeTrabajo: 'Lugar De Trabajo',
          categoria: 'Categoría',
          prepaga: 'Prepaga',
          obraSocial: 'Obra Social',
          planPrepaga: 'Plan Prepaga',
          banco: 'Banco',
          convenio: 'Convenio',
          finFechaContrat: 'Fin Fecha Contratación',
          tipoEgreso: 'Tipo Egreso',
          estadoCivil: 'Estado Civíl',
          grado: 'Grado',
          cargoManager: 'Cargo Del Manager',
          cargasDeFamilia: 'Cargas De Familia',
          nombres: 'Apellido Y Nombre',
          dni: 'Documento',
          fechaDesde: 'Fecha Desde',
          fechaHasta: 'Fecha Hasta'
        }
      }
    }
  });

export default i18n;