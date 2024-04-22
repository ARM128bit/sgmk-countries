<script setup lang="ts" generic="ValT extends string | number">
import WrapperInput from "./SgmkWrapperInput.vue";
import type { IDefaultInput } from "@sgmk-types/index";

withDefaults(defineProps<IDefaultInput<ValT>>(), {
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
});

const model = defineModel<ValT>();
</script>
<template>
  <wrapper-input :id="id" :label="label" :required="required">
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="sgmk-input"
      :class="{ 'sgmk-input--disabled': disabled }"
      :disabled="disabled"
    />
  </wrapper-input>
</template>
<style scoped lang="scss">
.sgmk-input {
  height: 30px;
  font-size: 14px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  color: var(--color-text);
  &--disabled {
    color: var(--color-text);
  }
}
</style>
