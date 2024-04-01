<script setup lang="ts">
import { useAppLanguageStore } from "@stores/appLanguage";
const langStore = useAppLanguageStore();
</script>
<template>
  <div class="layout">
    <div class="layout__header">
      <div class="layout__lang-selector">
        <sgmk-select
          v-model="langStore.currentLanguage"
          :options="langStore.languages"
          id-key="id"
          label-key="label"
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
