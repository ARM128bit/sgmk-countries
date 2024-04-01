import { ref, type Ref } from "vue";
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
    paginator: {
      firstPage: "First",
      prevPage: "Prev",
      nextPage: "Next",
      lastPage: "Last",
    },
  },
  rus: {
    paginator: {
      firstPage: "Первая",
      prevPage: "Предыдущая",
      nextPage: "Следующая",
      lastPage: "Последняя",
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
  return { languages, currentLanguage };
});
