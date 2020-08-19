import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        cart: "Cart",
        login: "Login",
        Contact: "Contact us",
        Wishlist: "Wishlist",
        Compare: "Compare",
        About: "About Us",
        Admin: "Admin User",
        discount: "Enjoy an extra 20% off" ,
        bannerh: "MADE FOR YOU!",
        bannerB: "SHOP NOW"
      }
    },
    ar: {
      translations: {
        cart: "عربه التسوق",
        login: "تسجيل الدخول",
        Contact: "اتصل بنا",
        Wishlist: "قائمه الامنيات",
        Compare: "مقارنة",
        About: "إقرأ عننا",
        Admin: "صفحه الادمن",
        discount: "استمتع ب 20% خصم",
        bannerh: "! معمول علشانك",
        bannerB: "تسوق الّان"
      }
    }
  },
  fallbackLng: "en",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;