import { shallowReactive } from "vue";
import type { Country } from "@stores/country";

const VIEWED_COUNTRIES = "viewed-countries";

const getViewedCountries = () => {
  return new Set(JSON.parse(localStorage.getItem(VIEWED_COUNTRIES) ?? "[]"));
};
const viewed = shallowReactive(getViewedCountries());

export function useViewedCountries() {
  const setViewedCountries = () => {
    localStorage.setItem(VIEWED_COUNTRIES, JSON.stringify(Array.from(viewed)));
  };
  const addViewedCountry = (cca3: Country["cca3"]) => {
    viewed.add(cca3);
    setViewedCountries();
  };

  return { viewed, getViewedCountries, setViewedCountries, addViewedCountry };
}
