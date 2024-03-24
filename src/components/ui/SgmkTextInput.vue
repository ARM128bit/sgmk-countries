<script setup lang="ts">
import { computed } from "vue";
import WrapperInput from "./SgmkWrapperInput.vue";
interface DefaultProps {
  id: string;
  modelValue: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}
const props = withDefaults(defineProps<DefaultProps>(), {
  id: "",
  modelValue: "",
  label: "",
  placeholder: "",
  required: false,
});

const emits = defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:model-value", val);
  },
});
</script>
<template>
  <wrapper-input :id="id" :label="label" :required="required">
    <input v-model="value" type="text" :placeholder="placeholder" />
  </wrapper-input>
</template>
<style scoped lang="scss"></style>
./SgmkWrapperInput.vue
