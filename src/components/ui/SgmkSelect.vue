<template>
  <wrapper-input
    :id="id"
    :label="label"
    :required="required"
    v-click-outside="() => (opened = false)"
  >
    <div
      class="sgmk-select__value"
      :class="{ 'sgmk-select__value--opened': opened }"
      @click="opened = !opened"
    >
      {{ labelKey ? internalValue[labelKey] : internalValue }}
    </div>
    <div v-if="opened" class="sgmk-select__dropdown">
      <ul class="sgmk-select__dropdown-list">
        <li
          v-if="options?.length > 0"
          v-for="(option, idx) in options"
          :key="idKey ? option[labelKey] : idx"
          class="sgmk-select__dropdown-option"
          @click="
            () => {
              internalValue = option;
              opened = false;
            }
          "
        >
          <slot name="option" :option="option">
            {{ idKey ? option[labelKey] : option }}
          </slot>
        </li>
        <li class="sgmk-select__dropdown-option" v-else>
          <slot name="no-options"> Нет данных </slot>
        </li>
      </ul>
    </div>
  </wrapper-input>
</template>
<script setup lang="ts" generic="ValT">
import { ref, type PropType, computed } from "vue";
import WrapperInput from "./SgmkWrapperInput.vue";
import type { IDefaultInput } from "@sgmk-types/index";

interface SelectProps {
  modelValue: PropType<ValT>;
  options: PropType<ValT[]>;
  idKey?: string;
  labelKey?: string;
}

const props = withDefaults(defineProps<IDefaultInput<ValT> & SelectProps>(), {
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
  modelValue: undefined,
  options: () => [],
  idKey: "",
  labelKey: "",
});

const emit = defineEmits({
  "update:model-value": (val: ValT) => {
    return val;
  },
});

const internalValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:model-value", val);
  },
});

const opened = ref(false);
</script>

<style scoped lang="scss">
.sgmk-select {
  &__value {
    padding: 5px;
    border: 1px solid $color-onyx;
    border-radius: 3px;
    &--opened {
      border-radius: 3px 3px 0 0;
      border-bottom: 0;
    }
  }
  &__dropdown {
    position: absolute;
    width: 100%;
    background-color: $color-white;
    border: 1px solid $color-onyx;
    border-top: 0;
    z-index: 100;
    &-list {
      margin: 5px 0;
      padding: 0;
      list-style: none;
    }
    &-option {
      padding: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-color: $color-light-silver;
      }
    }
  }
}
</style>
