<script setup lang="ts">
import type { SelectLabel } from "@sgmk-types/index";
import { useAppLanguageStore, UITranslations } from "@stores/appLanguage";
import { computed, ref } from "vue";
const langStore = useAppLanguageStore();
const darkThemeLang = computed(() => {
  return UITranslations[langStore.currentLanguageId].darkTheme;
});
const darkTheme = ref(false);

const changeTheme = (val: boolean) => {
  const root = document.querySelector(":root");
  if (val) {
    root?.classList.add("dark");
  } else {
    root?.classList.remove("dark");
  }
};
</script>
<template>
  <div class="layout">
    <div class="layout__header">
      <div class="layout__lang-selector">
        <sgmk-select
          v-model="langStore.currentLanguage"
          id="app-language-selector"
          :options="langStore.languages"
          :option-id="(option: SelectLabel) => option.id"
          :option-label="(option: SelectLabel) => option.label"
        >
        </sgmk-select>
      </div>
      <div class="layout__theme-toggle">
        <label>
          {{ darkThemeLang }}
          <input
            v-model="darkTheme"
            type="checkbox"
            @update:model-value="changeTheme"
          />
        </label>
      </div>
    </div>
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">

.layout {
  height: 100%;
  &__header {
    display: flex;
    flex-wrap: nowrap;
    height: 60px;
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-border);
  }
  &__content {
    height: calc(100% - 60px);
    padding: 10px;
  }
  &__lang-selector, &__theme-toggle {
    width: 125px;
    padding-left: 10px;
    margin: auto 0;
  }
}
</style>
