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
          numeroLegajo: 'Numero de Legajo',
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
          codigoGrado: "Grado"
        }
      }
    }
  });

export default i18n;