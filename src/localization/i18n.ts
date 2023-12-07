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
          paises: 'Países'
        }
      }
    }
  });

export default i18n;