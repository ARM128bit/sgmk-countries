<script setup lang="ts">
import type { SelectLabel } from "@sgmk-types/index";
import { useAppLanguageStore } from "@stores/appLanguage";
const langStore = useAppLanguageStore();
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
    </div>
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  &__header {
    display: flex;
    flex-wrap: nowrap;
    height: 60px;
    background-color: $color-french-gray;
  }
  &__content {
    padding: 10px;
  }
  &__lang-selector {
    width: 125px;
    justify-self: flex-end;
    padding: 10px
  }
}
</style>
