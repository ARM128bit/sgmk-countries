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
      {{ model ? optionLabel(model) : model }}
    </div>
    <div v-if="opened" class="sgmk-select__dropdown">
      <ul class="sgmk-select__dropdown-list">
        <li
          v-if="options?.length > 0"
          v-for="option in options"
          :key="optionId(option)"
          class="sgmk-select__dropdown-option"
          @click="
            () => {
              model = option;
              opened = false;
            }
          "
        >
          <slot name="option" :option="option">
            {{ optionLabel(option) }}
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
import { ref } from "vue";
import WrapperInput from "./SgmkWrapperInput.vue";
import type { IDefaultInput } from "@sgmk-types/index";

interface SelectProps {
  options: ValT[];
  optionId: (option: ValT) => number | string;
  optionLabel: (option: ValT) => string;
}

withDefaults(defineProps<IDefaultInput<ValT> & SelectProps>(), {
  label: "",
  placeholder: "",
  required: false,
  disabled: false,
  options: () => [],
  // optionId: (option: PropType<ValT>) => option["id"],
  // optionLabel: (option: PropType<ValT>) => option["label"],
});

const model = defineModel<ValT>()

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
