<script setup lang="ts">
interface DefaultProps {
  type: "primary" | "secondary";
}
withDefaults(defineProps<DefaultProps>(), {
  type: "primary",
});
</script>

<template>
  <button class="btn" :class="[`btn--${type}`]">
    <span class="btn__text">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  font-weight: 300;
  gap: 4px;
  height: 30px;
  padding: 0 10px;
  border-radius: 3px;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;

  &--primary {
    background: $color-azure;
    color: $color-white;
    border: none;

    &:hover {
      background: $color-denim;
    }
  }

  &--danger {
    background: $color-red;
    color: $color-white;
    border: none;

    &:hover {
      background: $color-engineering-orange;
    }
  }

  &--secondary {
    background: $color-ghost-white;
    border: 1px solid $color-french-gray;
    color: $color-slate-gray;

    &:not(.disabled):hover {
      background: $color-bright-gray;
    }
  }

  &_active {
    background: $color-slate-gray;
    color: $color-ghost-white;
    border: 1px solid $color-slate-gray;

    &:hover {
      background: $color-slate-gray;
    }
  }

  &__text {
    order: 1;
    padding: 2px;
  }
}
</style>
