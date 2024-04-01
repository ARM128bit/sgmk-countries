import { defineStore } from "pinia";
import { getAllContries } from "@api/routes";
import useList from "@hooks/useList";
import usePaginator from "@hooks/usePaginator";
import { computed } from "vue";

type LangName = {
  official: string;
  common: string;
};

type Translations = {
  [key: string]: LangName
};

type Lang = {
  [key: string]: string;
};

type Currency = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

type CountryName = LangName & {
  nativeName: Translations;
};

type TLD = string[];

type Region =
  | "Europe"
  | "Asia"
  | "Africa"
  | "Oceania"
  | "Americas"
  | "Antarctic";

type Americas = "North America" | "South America" | "Central America";

type SubRegion =
  | "Southern Europe"
  | "Eastern Africa"
  | "Western Africa"
  | "Polynesia"
  | "Central Asia"
  | "Southeast Europe"
  | "Northern Europe"
  | "Northern Africa"
  | "South-Eastern Asia"
  | "Middle Africa"
  | "Western Asia"
  | "Southern Asia"
  | "Caribbean"
  | "Central Europe"
  | "Micronesia"
  | "Australia and New Zealand"
  | "Eastern Europe"
  | "Western Europe"
  | "Melanesia"
  | "Eastern Asia"
  | "Southern Africa";

type Continents = Exclude<Region, "Americas" | "Antarctic"> & Americas;

type Coordinates = [number, number];

type Demonym = {
  [key: string]: {
    f: string;
    m: string;
  };
};

type Map = {
  [key: string]: string;
};

type Gini = {
  [key: string]: string;
};

type Car = {
  signs: string[];
  side: string;
};
type Timezones = string[];

type StartOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type CapitalInfo = {
  latlng: Coordinates;
  [key: string]: any;
};

type PostalCode = {
  format: string;
  regex: string;
};

type idd = {
  root: number;
  suffixes: number[];
};

type status = "officially-assigned" | "user-assigned";

type PngSvg = {
  png: string;
  svg: string;
};
type Flag = PngSvg & {
  alt: string;
};

export type Country = {
  name: CountryName;
  tld: TLD;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: status;
  unMember: boolean;
  currencies: Currency;
  idd: idd;
  capital: string[];
  altSpellings: string[];
  region: Region;
  subregion?: SubRegion;
  languages: Lang;
  translations: Translations;
  latlng: Coordinates;
  landlocked: boolean;
  area: number;
  demonyms: Demonym;
  flag: "🇨🇾";
  maps: Map;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: Timezones;
  continents: Continents;
  flags: Flag;
  coatOfArms: PngSvg;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
};


export const useCountryStore = defineStore("country", () => {
  const paginator = usePaginator()
  const { list, loadList } = useList<Country>(getAllContries)

  const getList = computed(() => {
    return list.value.slice((paginator.pagination.page - 1) * paginator.pagination.size, paginator.pagination.page * paginator.pagination.size)
  })
   
  return { list, paginator, loadList, getList };
});
