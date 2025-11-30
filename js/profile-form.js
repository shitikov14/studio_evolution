import { countries } from "./countries.js";

function profileFormFactory() {
  return {
    form: {
      firstName: "Федор",
      lastName: "Семенов",
      phone: "+7 (792)016-28-62",
      countryIso: "RU",
      city: "",
      venueName: "Karaoke Empire",
      venueAddress: "",
      venueSite: "karaoke-empire.com",
      email: "zanzak17@gmail.com"
    },

    errors: {},

    countries,

    get currentCountry() {
      return (
        this.countries.find(
          (country) => country.iso === this.form.countryIso
        ) || this.countries[0]
      );
    },

    get filteredCities() {
      return this.currentCountry.cities || [];
    },

    get phonePlaceholder() {
      const mask = this.currentCountry.mask.replace(/#/g, "_");
      return `${this.currentCountry.code} ${mask}`;
    },

    inputClass(field) {
      const base =
        "w-full border px-3 outline-none transition-colors py-10 md:py-17";
    
      if (this.errors[field]) {
        return (
          base +
          " border-error focus:border-error focus:ring-1 focus:ring-error"
        );
      }
      
      return (
        base +
        " border-borderInput focus:border-brand focus:ring-1 focus:ring-brand"
      );
    },    

    onCountryChange() {
      this.form.city = "";
      this.form.phone = "";
    },

    onPhoneInput(event) {
      const value = event.target.value;
      const digits = value.replace(/\D/g, "");

      const codeDigits = this.currentCountry.code.replace(/\D/g, "");
      let rest = digits;

      if (rest.startsWith(codeDigits)) {
        rest = rest.slice(codeDigits.length);
      }

      let result = this.currentCountry.code + " ";
      let i = 0;
      const mask = this.currentCountry.mask;

      for (const ch of mask) {
        if (ch === "#") {
          if (i < rest.length) {
            result += rest[i];
            i++;
          } else {
            break;
          }
        } else {
          result += ch;
        }
      }

      this.form.phone = result;
    },

    validate() {
      this.errors = {};

      if (!this.form.firstName.trim()) {
        this.errors.firstName = "Укажите имя";
      }
      if (!this.form.lastName.trim()) {
        this.errors.lastName = "Укажите фамилию";
      }

      if (!this.form.countryIso) {
        this.errors.countryIso = "Выберите страну";
      }
      if (!this.form.city) {
        this.errors.city = "Выберите город";
      }

      const phoneDigits = this.form.phone.replace(/\D/g, "");
      const codeDigits = this.currentCountry.code.replace(/\D/g, "");
      const requiredDigits =
        codeDigits.length +
        (this.currentCountry.mask.match(/#/g) || []).length;

      if (!this.form.phone.trim()) {
        this.errors.phone = "Укажите телефон";
      } else if (phoneDigits.length !== requiredDigits) {
        this.errors.phone = "Телефон не соответствует формату страны";
      }

      const email = this.form.email.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        this.errors.email = "Укажите E-mail";
      } else if (!emailPattern.test(email)) {
        this.errors.email = "Некорректный формат E-mail";
      }

      return Object.keys(this.errors).length === 0;
    },

    submit() {
      if (this.validate()) {
        alert("Форма валидна, можно отправлять данные на сервер");
      } else {
        const firstField = Object.keys(this.errors)[0];
        if (firstField) {
          const el = document.getElementById(firstField);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    },

    resetForm() {
      this.errors = {};
    }
  };
}

window.profileForm = profileFormFactory;
