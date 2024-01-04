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
          numeroLegajo: 'Número de Legajo',
          fechaAlta: "Fecha de Alta",
          fechaBaja: "Fecha de Baja",
          descripcion: "Descripción",
          codigo: "Código",
          tipoParametro: "Tipo de Parámetro",
          parameterType: "Tipo de Parámetro",
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
          paises: 'Países',
          codigoCentroDeCosto: "Centro de costo",
          codigoPais: "País",
          apellido: "Apellido",
          nombre: "Nombre",
          segundoNombre: "Segundo Nombre",
          nombrePreferido: "Nombre preferido",
          codigoGenero: "Género",
          fechaNacimiento: "Fecha de nacimiento",
          codigoGeneracion: "Generación",
          fechaIngreso: "Fecha de ingreso",
          codigoTipoDocumento: "Tipo doc",
          numeroDocumentoPersonal: "Nro. Doc. Personal",
          numeroDocumentoLaboral: "Nro. Doc. laboral",
          codigoOficina: "Oficina",
          codigoCategoriaEmpleado: "Categoría del empleado",
          codigoPuesto: "Puesto",
          codigoNacionalidad: "Nacionalidad",
          codigoPaisResidencia: "País residencia",
          calleResidencia: "Calle residencia",
          numeroResidencia: "Número residencia",
          pisoResidencia: "Piso residencia",
          departamentoResidencia: "Depto. residencia",
          localidadResidencia: "Localidad residencia",
          codigoProvincia: "Provincia",
          emailPersonal: "Email personal",
          codigoEstadoCivil: "Estado civil",
          codigoBanco: "Banco",
          cbu: "C.B.U.",
          fechaIngresoReconocida: "Fecha ingreso reconocida",
          codigoTipoContratacion: "Tipo contratación",
          horasSemanales: "Horas Semanales",
          fte: "F.T.E.",
          codigoFrecuenciaLiquidacion: "Frec. liquidación",
          codigoTipoEmpleo: "Tipo empleo",
          codigoTipoJornada: "Tipo jornada",
          emailLaboral: "Email laboral",
          codigoDivision: "División",
          codigoPrepaga: "Prepaga",
          codigoObraSocial: "Obra social",
          codigoConvenio: "Convenio",
          codigoCategoriaConvenio: "Categoría convenio",
          afiliadoSindicato: "Afiliado sindicato",
          codigoGrado: "Grado",
          ingresoCaido: "Ingreso caido",
          cambioDePuesto: "Historial de puesto",
          cargaDeFamilia: "Carga de familia",
          licenciaHistory: "Historial de licencia",
          external: "Empleado externo",
          codigoTipoEgreso: "Motivo de egreso",
          observaciones: "Observaciones",
          fechaEgreso: "Fecha de egreso",
          tipoLicencia: "Tipo de licencia",
          fechaInicio: "Fecha de inicio",
          fechaFin: "Fecha de fin",
          'vuelta-al-colegio': "Vuelta al colegio",
          'centro-de-costo': 'Centro de costo',
          directores: 'Directores',
          'historial-de-empleados': 'Historial de empleados',
          externos: 'Externos',
          generico: 'Genérico',
          'international-data-collection': 'International data collection',
          licencias: 'Licencias',
          codigoEstadoEmpleado: 'Estado'

        }
      }
    }
  });

export default i18n;