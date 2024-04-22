import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { SelectLabel } from "@sgmk-types/index";

export enum Languages {
  rus = "Русский",
  eng = "English",
}

export type LanguagesKeys = keyof typeof Languages;

export type TLanguages = { id: LanguagesKeys; label: Languages }[];

export const UITranslations = {
  eng: {
    darkTheme: "Dark theme",
    table: {
      empltyList: "Empty table"
    },
    paginator: {
      firstPage: "First",
      prevPage: "Prev",
      nextPage: "Next",
      lastPage: "Last",
    },
    countryCard: {
      toCountriesListURL: "To countries list",
      title: "A country card",
      namesTable: {
        title: "Names",
        common: "Common",
        official: "Official",
        localCommon: "Common (Native)",
        localOfficial: "Official (Native)",
      },
      translation: {
        title: "Translations",
      },
      geography: {
        title: "Geography",
        capital: "Capital",
        region: "Region",
        subregion: "Subregion",
        area: "Area",
        borders: "Borders",
      },
      showMap: { visible: "Show map", hidden: "Hide map" },
    },
    countryFavouriteBtn: {
      toFavourite: "To favourite",
      removeFromFavourites: "Remove from favourites",
    },
    countryListFilter: {
      search: "Search",
      searchBtn: "Find",
      onlyFavourites: "Only favourites",
    },
    countryList: {
      columns: {
        name: "Name",
        viewed: "Viewed"
      },
      viewed: "Viewed"
    },
  },
  rus: {
    darkTheme: "Тёмная тема",
    table: {
      empltyList: "Отсутствуют данные"
    },
    paginator: {
      firstPage: "Первая",
      prevPage: "Предыдущая",
      nextPage: "Следующая",
      lastPage: "Последняя",
    },
    countryCard: {
      toCountriesListURL: "К списку стран",
      title: "Информация о стране",
      namesTable: {
        title: "Наименования",
        common: "Общее (междунар.)",
        official: "Официальное (междунар.)",
        localCommon: "Общее",
        localOfficial: "Официальное",
      },
      translation: {
        title: "Переводы на др.языки",
      },
      geography: {
        title: "География",
        capital: "Столица",
        region: "Регион",
        subregion: "Субрегион",
        area: "Площадь",
        borders: "Границы с",
      },
      showMap: { visible: "Показать карту", hidden: "Скрыть карту" },
    },
    countryFavouriteBtn: {
      toFavourite: "В избранное",
      removeFromFavourites: "Убрать из избранного",
    },
    countryListFilter: {
      search: "Поиск",
      searchBtn: "Найти",
      onlyFavourites: "Только избранное",
    },
    countryList: {
      columns: {
        name: "Наименование",
        viewed: "Просмотрено"
      },
      viewed: "Просмотрено"
    },
  },
};

export const useAppLanguageStore = defineStore("appLanguage", () => {
  const languages: TLanguages = Object.entries(Languages).map(([id, label]) => {
    return {
      id: id as LanguagesKeys,
      label,
    };
  });

  const currentLanguage: Ref<
    SelectLabel<Languages, LanguagesKeys> | undefined
  > = ref(languages.find((lang) => lang.id === "rus"));

  const currentLanguageId = computed(() => currentLanguage.value?.id ?? "rus");

  return { languages, currentLanguage, currentLanguageId };
});
