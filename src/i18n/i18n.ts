import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import HOME_EN from 'src/components/locales/en/home.json'
import WEALTH_TOOL_EN from 'src/components/locales/en/wealthtool.json'
import HOME_VI from 'src/components/locales/vi/home.json'
import WEALTH_TOOL_VI from 'src/components/locales/vi/wealthtool.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng việt',
}

const resources ={
    en: { 
        home: HOME_EN,
        wealth_tool: WEALTH_TOOL_EN
      },
    vi: {
      home: HOME_VI,
      wealth_tool: WEALTH_TOOL_VI
    }
}

const defaultNS = 'home'

i18n.use(initReactI18next).init({
    lng: "vi",
    ns: ['home', 'wealth_tool'],
    defaultNS,
    debug: true,
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });
