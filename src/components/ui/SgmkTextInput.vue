<script setup lang="ts" generic="ValT extends string | number">
import { computed } from "vue";
import WrapperInput from "./SgmkWrapperInput.vue";
import type { IDefaultInput } from "@sgmk-types/index";

const props = withDefaults(defineProps<IDefaultInput<ValT>>(), {
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
});

const emits = defineEmits<{
  (e: "update:model-value", value: ValT): void;
}>();

const value = computed({
  get(): ValT {
    return props.modelValue;
  },
  set(val: ValT) {
    emits("update:model-value", val);
  },
});
</script>
<template>
  <wrapper-input :id="id" :label="label" :required="required">
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :class="{ 'sgmk-input--disabled': disabled }"
      :disabled="disabled"
    />
  </wrapper-input>
</template>
<style scoped lang="scss">
.sgmk-input {
  &--disabled {
  }
}

</style>
