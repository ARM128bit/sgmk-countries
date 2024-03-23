<script setup lang="ts">
import { computed } from "vue";

interface DefaultProps {
  id: string;
  label: string;
  required: boolean;
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
// @import '@assets/styles/_vars.scss';

// .form-wrapper {
//   position: relative;

//   &__outer-label {
//     width: 100%;
//     padding: $default-input-padding;
//     min-height: $line-height-md;
//     line-height: $line-height-md;
//     font-size: $font-size-sm;
//     font-weight: $font-weight-light;
//     color: $color-silver;

//     &_align_left {
//       text-align: left;
//     }

//     &_align_right {
//       text-align: right;
//     }

//     &_align_center {
//       text-align: center;
//     }
//   }

//   &__inner-label {
//     min-height: $line-height-md;
//     line-height: $line-height-md;
//     font-size: $font-size-md;
//     font-weight: $font-weight-light;
//     color: $color-silver;
//     cursor: text;
//   }

//   &__container {
//     position: relative;
//   }

//   &__container &__inner-label {
//     position: absolute;
//     top: calc(($input-height-md - $font-size-md) / 2);
//     left: $input-p-x;
//     z-index: 10;
//   }
// }
</style>
