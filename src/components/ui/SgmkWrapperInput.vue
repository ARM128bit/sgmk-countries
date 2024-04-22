<script setup lang="ts">
import { computed } from "vue";

interface DefaultProps {
  id: string;
  label: string;
  required?: boolean;
}
const props = withDefaults(defineProps<DefaultProps>(), {
  id: "",
  label: "",
  required: false,
});
const labelText = computed(() =>
  props.required ? `${props.label} *` : props.label
);
</script>
<template>
  <div class="form-wrapper">
    <label v-if="label" :for="id" class="form-wrapper__outer-label">
      {{ labelText }}
    </label>
    <div class="form-wrapper__container">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form-wrapper {
  position: relative;
}
</style>
